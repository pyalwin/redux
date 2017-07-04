import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/auth';
import update from 'react-addons-update';
import ReactDataGrid from 'react-data-grid';
import ReactDataGridPlugins from 'react-data-grid-addons';
var LineChart = require("react-chartjs").Line;

var chartData = {
  labels: [1,2,3],
  datasets: [
    {
      data: [1,2,3],
      borderColor: '#3cba9f',
      fill: true
    }
  ]
}

var myVal;

const Example = React.createClass({
  getInitialState() {
    this._columns = [
      {
        key: 'id',
        name: 'ID',
        width: 80
      },
      {
        key: 'task',
        name: 'Title',
        editable: true
      },
      {
        key: 'priority',
        name: 'Priority',
        editable: true
      },
      {
        key: 'issueType',
        name: 'Issue Type',
        editable: true
      },
      {
        key: 'complete',
        name: '% Complete',
        editable: true
      },
      {
        key: 'startDate',
        name: 'Start Date',
        editable: true
      },
      {
        key: 'completeDate',
        name: 'Expected Complete',
        editable: true
      }
    ];

    return { rows: this.createRows(1000) };
  },

  getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
  },

  createRows(numberOfRows) {
    let rows = [];
    for (let i = 1; i < numberOfRows; i++) {
      rows.push({
        id: i,
        task: 'Task ' + i,
        complete: Math.min(100, Math.round(Math.random() * 110)),
        priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
        issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
        startDate: this.getRandomDate(new Date(2015, 3, 1), new Date()),
        completeDate: this.getRandomDate(new Date(), new Date(2016, 0, 1))
      });
    }
    myVal = rows;
    return rows;
  },

  rowGetter(i) {
    return this.state.rows[i];
  },

  handleGridRowsUpdated({ fromRow, toRow, updated }) {
    let rows = this.state.rows.slice();

    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i];
      let updatedRow = update(rowToUpdate, {$merge: updated});
      rows[i] = updatedRow;
    }



    this.setState({ rows });
  },


  render() {
    return  (
      <ReactDataGrid
        enableCellSelect={true}
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this.state.rows.length}
        minHeight={500}
        onGridRowsUpdated={this.handleGridRowsUpdated} />
    )}
});

const ChartComp = React.createClass({
  getChartData() {
    let rows = {
      labels: [],
      datasets: [
        {
          data: [],
          borderColor: '#3cba9f',
          fill: true
        }
      ]
    }
    for(let i=0; i < 30; i++){
        rows.labels.push(myVal[i].id)
        rows.datasets[0].data.push(myVal[i].complete)
    }
    return rows;
  },

  render(){
    return (<LineChart data={this.getChartData()} width="600" height="250"/>)
  }

});

function mapStateToProps(state) {
    return {
        isRegistering: state.auth.isRegistering,
        registerStatusText: state.auth.registerStatusText,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}


@connect(mapStateToProps, mapDispatchToProps)
class Analytics extends React.Component { // eslint-disable-line react/prefer-stateless-function

    render() {
        return (
          <div>
            <div className="row">
              <div className="col-md-8">
                  <h1>Analytics</h1>
                  <hr />
              </div>
            </div>
            <div className="row">
            <Example />
            </div>
            <div className="rownew">
            <ChartComp />
            </div>
        </div>
        );
    }
}

export default Analytics;
