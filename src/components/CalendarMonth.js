import React, { Component } from "react";
import TheMonth from "./TheMonth";
import TheWeekDays from "./TheWeekDays";
import TheDay from "./TheDay";
import moment from "moment";

export default class CalendarMonth extends Component {
  state = {
    curMonth: {},
    nextMonth: {},
    prevMonth: {}
  };

  componentDidMount() {
    this.createState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createState(nextProps, true);
  }

  createState(props) {
    const curMonth =
      props.match.params.year && props.match.params.month
        ? `${props.match.params.year}-${props.match.params.month}`
        : moment().format("YYYY-MM");

    const nextMonth = moment.curMonth.add(1, "M").format("YYYY-MM");

    const prevMonth = moment.curMonth.subtract(1, "M").format("YYYY-MM");

    this.setState(
      {
        curMonth: {
          date: curMonth,
          name: moment(curMonth).format("MMMM-YYYY"),
          days: moment(curMonth).daysInMonth(),
          editDay: null
        },

        nextMonth: {
          date: nextMonth,
          slug: nextMonth.replace("-", "/")
        },

        prevMonth: {
          date: prevMonth,
          slug: prevMonth.replace("-", "/")
        }
      },
      () => {
        console.warn(this.state);
      }
    );
  }

  handleEditDay = day => {
    this.setState({
      curMonth: {
        ...this.state.curMonth,
        editDay: day
      }
    });
  };

  makeDays() {
    const days = [];
    const props = {
      editDay: this.state.curMonth.editDay,
      handleEditDay: this.handleEditDay
    };

    for (let i = 1; i <= this.state.curMonth.days; i++) {
      let date = `${this.state.curMonth.date}-${("0" + i).slice(-2)}`; //adds leading zeros to dates
      props["date"] = date;
      props["day"] = i;

      if (i === 1) {
        props["firstDayIndex"] = moment(date)
          .startOf("month")
          .format("d");
      } else {
        delete props["firstDayIndex"];
      }

      days.push(<TheDay key={i} {...props} />);
    }

    return days;
  }

  render() {
    const weekdays = moment.weekdays();
    const days = this.buildDays();
    return (
      <div className="month">
        <TheMonth
          curMonth={this.state.curMonth}
          nextMonth={this.state.nextMonth}
          prevMonth={this.state.prevMonth}
        />

        <TheWeekDays days={weekdays} />

        <section className="days">{days}</section>
      </div>
    );
  }
}
