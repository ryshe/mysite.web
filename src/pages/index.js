import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import cmsServices from '../services/cms';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(4),
  },
  input: {
    display: 'none',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  aboutSection1: {
    background: '#666',
    padding: theme.spacing(2),
    color: '#ccc',
  },
  aboutSection2: {
    background: '#ccc',
    padding: theme.spacing(2),
  },
}));

/**
 * Full Resume Component
 */
function MyResume(props) {
  const classes = useStyles();
  const [jobs, setJobs] = useState({});
  const [about, setAbout] = useState({});
  const [error, setError] = useState(false);

  // Load the content from Strapi
  useEffect(() => {
    const loadContent = async () => {
      try {
        const [aboutData, jobsList] = await Promise.all([
          cmsServices.getAbout(),
          cmsServices.getJobs(),
        ]);
        const jobsByCompany = jobsList.reduce((jobsByCompany, oneJob) => {
          const companyName = oneJob.app_company.name;
          if (!jobsByCompany[companyName]) {
            jobsByCompany[companyName] = [];
          }
          jobsByCompany[companyName].push(oneJob);
          return jobsByCompany;
        }, {});

        setJobs(jobsByCompany);
        setAbout(aboutData);
      } catch (e) {
        setError(true);
      }
    };

    loadContent();

    console.log('about data: ', about);
    console.log('jobs data: ', jobs);

    return function cleanup() {
      // Nothing for now
    };
  }, []);

  return (
    <>
      {error && <div>Service is down</div>}
      {!error && (
        <Grid container className={classes.root}>
          {/* TODO: make this a component (Profile About) */}
          <Grid container item xs={12}>
            <Box boxShadow="3">
              <Grid container item xs={12}>
                <Grid container item xs={12} sm={4} className={classes.aboutSection1}>
                  <Grid
                    container
                    item
                    xs={6}
                    sm={12}
                    justify="center"
                    alignContent="center"
                  >
                    <Box p={0}>
                      <div className="about-profile-pic-container"></div>
                    </Box>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={6}
                    sm={12}
                    justify="center"
                    alignContent="center"
                    direction="column"
                  >
                    <Typography align="center">{about.name}</Typography>
                    <Typography align="center">{about.phone}</Typography>
                    <Typography align="center">{about.email}</Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={8} className={classes.aboutSection2}>
                  <Grid item xs={12}>
                    <Box clone padding={0}>
                      <Typography align="left">{about.summary}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <ul>
                      {about.passions &&
                        about.passions.map(oneItem => (
                          <Typography component="li" key={oneItem.id}>
                            {oneItem.name}
                          </Typography>
                        ))}
                    </ul>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          {/*  TODO: make this a component (Graph) */}
          <Grid container item xs={12}>
            <Box p={3}>
              <Typography>graph to go here</Typography>
            </Box>
          </Grid>
          {/*  TODO: make this a component (Job History) */}
          <Grid container item xs={12}>
            {jobs &&
              Object.entries(jobs).map(entry => {
                const [companyName, jobsList] = entry;

                return (
                  <Grid item key={companyName} xs={12}>
                    <Box boxShadow="3" my={2}>
                      <Box
                        px={{ xs: 2, md: 3 }}
                        py={1}
                        bgcolor="primary.main"
                        color="#fff"
                      >
                        <Typography>{companyName}</Typography>
                      </Box>
                      {jobsList.map(job => {
                        return (
                          <Grid container spacing={0} key={job.id}>
                            <Grid item xs={12}>
                              <Box
                                component="h2"
                                px={{ xs: 2, md: 3 }}
                                py={1}
                                m={0}
                                bgcolor="#666"
                                color="#fff"
                              >
                                <Typography>{job.title}</Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                              <Box p={{ xs: 2, md: 3 }} bgcolor="#ccc" height="100%">
                                <Typography>{job.summary}</Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                              <Box p={{ xs: 2, md: 3 }} bgcolor="#fa7b61" height="100%">
                                <Typography>skills</Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={12}>
                              <Box p={{ xs: 2, md: 3 }} bgcolor="#fff">
                                <ul>
                                  {job.accomplishments.map(oneAccomplishment => (
                                    <Box component="li" p={1} key={oneAccomplishment.id}>
                                      <Typography>
                                        {oneAccomplishment.description}
                                      </Typography>
                                    </Box>
                                  ))}
                                </ul>
                              </Box>
                            </Grid>
                          </Grid>
                        );
                      })}
                    </Box>
                  </Grid>
                );
              })}
          </Grid>

          {/*  Testing out style jsx */}
          <style jsx>
            {`
              .about-profile-pic-container {
                height: 100px;
                width: 100px;
                border: 1px solid #ccc;
              }
            `}
          </style>
        </Grid>
      )}
    </>
  );
}

function Index() {
  const classes = useStyles();

  return (
    <Layout>
      <MyResume />
    </Layout>
  );
}

export default Index;
