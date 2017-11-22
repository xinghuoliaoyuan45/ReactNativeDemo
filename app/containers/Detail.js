import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'dva'
import { BarChart, LineChart } from 'react-native-chart-android'

@connect()
class Detail extends Component {
  static navigationOptions = {
    title: 'Detail',
  }
  constructor(props) {
    super(props)
    this.state = {}
  }

  getBarData = () => {
    const data = {
      xValues: ['1', '2', '3'],
      yValues: [
        {
          data: [4.0, 5.0, 6.0],
          label: 'test1',
          config: {
            color: 'blue',
          },
        },
        {
          data: [4.0, 5.0, 6.0],
          label: 'test2',
          config: {
            color: 'red',
          },
        },
        {
          data: [4.0, 5.0, 6.0],
          label: 'test2',
          config: {
            color: 'yellow',
          },
        },
      ],
    }
    return data
  }
  getRandomData = () => {
    const data = {}
    data.xValues = []
    data.yValues = [
      {
        data: [],
        label: 'test1',
        config: {
          color: 'blue',
        },
      },
    ]
    for (let i = 0; i < 500; i+=1) {
      data.xValues.push(`${i}`)
      data.yValues[0].data.push(Math.random() * 100)
    }
    return data
  }
  render() {
    return (
      <View style={styles.container}>
        <BarChart style={{ flex: 1 }} data={this.getBarData()} />
        <BarChart
          style={{ flex: 1 }}
          data={this.getRandomData()}
          visibleXRange={[0, 30]}
          maxVisibleValueCount={50}
          xAxis={{ drawGridLines: false, gridLineWidth: 1, position: 'BOTTOM' }}
          yAxisRight={{ enable: false }}
          yAxis={{
            startAtZero: false,
            drawGridLines: false,
            position: 'INSIDE_CHART',
          }}
          drawGridBackground={false}
          backgroundColor={'WHITE'}
          description={'测试'}
          legend={{
            enable: true,
            position: 'ABOVE_CHART_LEFT',
            direction: 'LEFT_TO_RIGHT',
          }}
        />
        <LineChart
          style={{ flex: 1 }}
          data={this.getRandomData()}
          visibleXRange={[0, 30]}
          maxVisibleValueCount={50}
          xAxis={{
            drawGridLines: false,
            gridLineWidth: 1,
            position: 'BOTTOM',
            labelRotationAngle: 12.0,
            spaceBetweenLabels: 10,
          }}
          yAxisRight={{ enable: false }}
          yAxis={{
            startAtZero: false,
            drawGridLines: true,
            position: 'OUTSIDE_CHART',
            textColor: '#E94343',
          }}
          drawGridBackground={false}
          backgroundColor={'#FAFAFA'}
          description={'Line Chart sample'}
          legend={{
            enable: true,
            position: 'ABOVE_CHART_LEFT',
            direction: 'LEFT_TO_RIGHT',
            legendForm: 'CIRCLE',
          }}
          pinchZoom
          dragDecelerationFrictionCoef={0.5}
          noDataText={'No data available'}
          onSelect={e => {
            console.log(
              'onSelect xIndex',
              e.nativeEvent.xIndex,
              'yValue:',
              e.nativeEvent.yValue
            )
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chartContainer: {
    flex: 1,
  },
})

export default Detail
