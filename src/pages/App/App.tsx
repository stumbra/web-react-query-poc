import { Space, Layout, Spin, Button } from "antd";
import { useQuery } from "@tanstack/react-query";
import JSONPretty from "react-json-pretty";
import styles from "./styles";
import { useEffect, useState } from "react";
import { Action, Post } from "./types";
import { FETCH_POSTS_API, FETCH_POST_API } from "../../api/endpoints";

const { Content, Header } = Layout;

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [action, setAction] = useState<Action>(Action.FETCH_ALL);

  const {
    isFetching: isFetchingAllPosts,
    refetch: refetchAllPosts,
    isRefetching: isRefetchingAllPosts,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: FETCH_POSTS_API,
    onSuccess: (response) => setPosts(response.data),
    enabled: action === Action.FETCH_ALL,
  });

  const {
    isFetching: isFetchingPost,
    refetch: refetchPost,
    isRefetching: isRefetchingPost,
  } = useQuery({
    queryKey: ["post"],
    queryFn: FETCH_POST_API,
    onSuccess: (response) => setPosts([response.data]),
    enabled: action === Action.FETCH_BY_ID,
  });

  useEffect(() => {
    setPosts([]);
  }, [action]);

  return (
    <Space direction="vertical" style={styles.wrapper} size={[0, 48]}>
      <Layout>
        <Header>
          <Space style={styles.header}>
            <Button
              type={action === Action.FETCH_ALL ? "primary" : "default"}
              onClick={() => setAction(Action.FETCH_ALL)}
            >
              Fetch All Posts
            </Button>
            <Button
              type={action === Action.FETCH_BY_ID ? "primary" : "default"}
              onClick={() => setAction(Action.FETCH_BY_ID)}
            >
              Fetch By ID
            </Button>
            <Button
              onClick={() => {
                if (action === Action.FETCH_ALL) refetchAllPosts();
                else refetchPost();
              }}
            >
              Refetch
            </Button>
          </Space>
        </Header>
        <Content>
          {!isFetchingPost &&
          !isFetchingAllPosts &&
          !isRefetchingAllPosts &&
          !isRefetchingPost ? (
            <JSONPretty data={posts} mainStyle="margin: 8px" />
          ) : (
            <Space style={styles.spinner}>
              <Spin tip="Loading" size="large" />
            </Space>
          )}
        </Content>
      </Layout>
    </Space>
  );
}

export default App;
