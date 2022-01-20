import Head from 'next/head';
import { Button, Flex, Text, Code, Icon, Stack } from '@chakra-ui/core';

import { useAuth } from '@/lib/auth';

const Home = () => {
  const auth = useAuth();

  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
    >
      <Head>
        <title>Fast Feedback</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
            window.location.href = "/dashboard"
          }
        `
          }}
        />
      </Head>

      <Icon color="black" name="logo" size="64px" />
      {auth.user ? (
        <Button
          as="a"
          href="/dashboard"
          mt={4}
          size="sm"
          color="gray.900"
          fontWeight="medium"
          _hover={{ bg: 'gray.100' }}
          _active={{ bg: 'gray.100', transform: 'scale(0.95)' }}
          backgroundColor="white"
          size="lg"
          variant="outline"
        >
          View User Dashboard
        </Button>
      ) : (
        <Stack>
          <Button
            leftIcon={'github'}
            mt={4}
            size="sm"
            onClick={(e) => auth.signinWithGitHub()}
            color="white"
            fontWeight="medium"
            _hover={{ bg: 'gray.700' }}
            _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}
            backgroundColor="gray.900"
            size="lg"
          >
            Sign In with Github
          </Button>
          <Button
            leftIcon={'google'}
            mt={4}
            size="sm"
            onClick={(e) => auth.signInWithGoogle()}
            color="gray.900"
            fontWeight="medium"
            _hover={{ bg: 'gray.100' }}
            _active={{ bg: 'gray.100', transform: 'scale(0.95)' }}
            backgroundColor="white"
            size="lg"
            variant="outline"
          >
            Sign In with Google
          </Button>
        </Stack>
      )}
    </Flex>
  );
};

export default Home;
