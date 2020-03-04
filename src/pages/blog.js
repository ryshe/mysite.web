import Layout from '../components/Layout';
import Link from 'next/link';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(4),
  },
  input: {
    display: 'none',
  },
}));

/**
 * Simple example of a static component
 * @param {*} props
 */
function PostLink(props) {
  return (
    <li>
      <Link href={`/post/${props.id}`} as={`/post/${props.id}`}>
        <a>{props.id}</a>
      </Link>
    </li>
  );
}

/**
 * Various Exercises from tutorial
 */
function Blog() {
  const classes = useStyles();
  return (
    <Layout>
      <h1>My Blog</h1>
      <ul>
        <PostLink id="post-1" />
        <PostLink id="post-2" />
        <PostLink id="post-3" />
      </ul>
      <Button variant="contained" color="primary" className={classes.button}>
        Primary
      </Button>
      <Button variant="contained" color="primary" className={classes.button}>
        Another Button
      </Button>
      <div className="testCascading">
        <p>test at component level</p>
      </div>
      <style jsx>
        {/* example of scoped cmp level styling */
        `
          h1 {
            font-size: 50px;
            color: blue;
          }

          .testCascading p {
            padding: 30px;
          }
        `}
      </style>
    </Layout>
  );
};

/**
 * Example of a server side hydrated service call from tutorial
 */
Blog.getInitialProps = async props => {
  let result = [];
  try {
    result = await axios.get('https://api.tvmaze.com/search/shows?q=batman');

    // Expect this to be on server side logs
    console.log(result.data);
  } catch (e) {
    // Handle the error gracefully.
    console.log(e);
  }

  return {
    sampleServerSideData: result.data,
  };
};

export default Blog;
