import { Container, Paper, Typography, Box, IconButton } from '@material-ui/core';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { useHistory } from 'react-router'
import { ArrowForward } from '@material-ui/icons';
const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: 'תכנון',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
      yAxisID: 'y-axis-1',
    },
    {
      label: 'בפועל',
      data: [1, 2, 1, 1, 2, 2],
      fill: false,
      backgroundColor: 'rgb(54, 162, 235)',
      borderColor: 'rgba(54, 162, 235, 0.2)',
      yAxisID: 'y-axis-2',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
      },
      {
        type: 'linear',
        display: true,
        position: 'right',
        id: 'y-axis-2',
        gridLines: {
          drawOnArea: false,
        },
      },
    ],
  },
}

export default function MultiAxisLine() {

  const history = useHistory()

  return (
  <Container dir='rtl'>
    <Box display='flex' style={{ marginTop: '20px'}}>
                <Box>
                    <IconButton onClick={() => history.push('/admins')}>
                        <ArrowForward style={{color: 'black', fontWeight: 'bold'}}/>
                    </IconButton>
                </Box>
                <Box flexGrow={1}>
                    <Typography variant="h5" style={{
                            fontFamily: 'Heebo',
                            fontWeight: 'bold',
                            marginRight: '30px',
                            marginTop: '7px'
                        }}>
                         סטטיסטיקה
                    </Typography>
                </Box>
                 
            </Box>
    <Paper >
      <Line data={data} options={options} />
    </Paper>

  </Container>
)
 }
