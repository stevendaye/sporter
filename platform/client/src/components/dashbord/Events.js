import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import PropTypes from  "prop-types";
import Notifications from "../layout/Notifications";
import { doVoteEventWithErrorCheck } from "../../thunks/events";
import { doGetEventsWithErrorCheck } from "../../thunks/events";
import doSetRemoveNotification from "../../thunks/notifications";
import avatar from "../../assets/vendor/local/avatar.png";

class Events extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      event: null,
      quickRefresh: true,
      onceVoted: false
    }

    this.onVote = this.onVote.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSetEvent = this.onSetEvent.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentDidMount() {
    this._isMounted = true

    /* Generate a random event */
    const { events, auth: { user } } = this.props;
    const random = Math.random(), len = events.length;
    const event = events[Math.floor(random * len)];
    this.setState({ event });

    /* Check if the logged in user voted the current random event */
    this.state.event && (JSON.parse(this.state.event.votes)
    .filter(vote => vote.userid === user.id).length > 0)
    && this.setState({ onceVoted: true });

    /* Get all list of events at mount for the sake of the
    UNSAFE_componentWillReceiveProps component lifecycle method */
    this._isMounted && this.props.onGetEvents();
  }

  UNSAFE_componentWillReceiveProps() {
    const { quickRefresh } = this.state;
    const { events } = this.props;
    const len = events.length;
    if (quickRefresh) {
      if (events && len > 0) {
        const random = Math.random();
        const current = events[Math.floor(random * len)];
        this.onSetEvent(current);
      }
    }
  }

  onSetEvent(current) {
    this.setState({ event: current });
  }

  onClick(timeout) {
    setTimeout(() => {
      const { events } = this.props;
      const random = Math.random(), len = events.length;
      const event = events[Math.floor(random * len)];
      this.setState({ event });
    }, timeout);
  }

  onCheck(objectId, poll) {
    const { event } = this.state;
    const { auth: { isLoading, user } } = this.props;
    if (!isLoading &&
    JSON.parse(event.votes).filter(vote => vote.userid === user.id).length > 0) {
      this.props.onPushNotification();
      this.setState({ onceVoted: true });
    } else {
      this.onVote(objectId, poll);
      this.setState({ onceVoted: false });
      this.setState({ quickRefresh: false });
    }
    this.onClick(1500);
  }

  onVote(objectId, poll) {
    this.props.onSendVote(objectId, poll);
  }

  render() {
    const { event } = this.state;
    const { auth: { user } } = this.props;

    return (
      <Fragment>
        {!event || !user
          ? <h3 className = "text-dim block-center f-2">Loading Event...</h3>
          : (
            <section style = {{ position: "relative", margin: "0" }}>
              <Notifications/>
              <h2 className = "text-center" style = {{ margin: "0" }}>Sport Events</h2>
              <p style = {{ float: "right", cursor: "pointer" }}
                className = "text-primary" onClick = { () => { this.onClick(100) } }
              >
                Skip <span role = "img" aria-label = "img">&#9193;</span>
              </p>
              <div className = "clear"></div>
              <div className = "badge">
                <div className = "text-center pxy-1 px-2 my-2 bg-dim b-r-3">
                  {event.name} - <span className = "text-primary">{event.state}</span>
                </div>
                <div className = "text-center f-1 text-primary">
                  GROUP: {(event.group).toUpperCase()}
                </div>
                <div className = "badge-content">
                  <div className = "badge-content-1">
                    <div className = "badge-img-size">
                      <img className = "round-img img-avatar" src = {avatar}
                        alt = "Avatar" width = "100%" height = "100%"
                      />
                    </div>
                    <p style = {{ fontSize: "1.2rem" }} >{event.homeName}</p>
                    <p className = "text-primary f-1"><strong>HOME</strong></p>
                  </div>

                  <div className = "badge-content-2">
                    <span className = "f-3" role = "img" aria-label = "img">&#9918;</span>
                    <p className = "bg-dim px-2 b-r-6">{event.sport}</p>
                    <p className = "text-dark f-3">{event.country}</p>
                    <p className = "text-dim f-1">
                      Posted: <Moment format = "DD/MM/YYYY">{event.createdAt}</Moment>
                    </p>
                  </div>

                  <div className = "badge-content-3">
                    <div className = "badge-img-size">
                      <img className = "round-img img-avatar" src = {avatar}
                        alt = "Avatar" width = "100%" height = "100%"
                      />
                    </div>
                    <p style = {{ fontSize: "1.2rem" }} >{event.awayName}</p>
                    <p className = "text-primary f-1"><strong>AWAY</strong></p>
                  </div>
                </div>

                <div className = "btn-actions">
                  <button className = {
                    JSON.parse(event.votes)
                    .filter(vote => vote.userid === user.id && vote.poll === "home-win").length > 0
                    ? "btn-voted btn-grow"
                    : "btn-vote btn-grow" }
                    onClick = { () => {
                      this.onCheck(event.objectId, "home-win");
                      this.xbtn.className = "btn-vote btn-grow";
                    } }
                    ref = { el => this.xbtn = el }
                  >
                    Home Win
                  </button>

                  <button className = {
                    JSON.parse(event.votes)
                    .filter(vote => vote.userid === user.id && vote.poll === "draw").length > 0
                    ? "btn-voted btn-grow"
                    : "btn-vote btn-grow" }
                    onClick = { () => {
                      this.onCheck(event.objectId, "draw");
                      this.ybtn.className = "btn-vote btn-grow";
                    } }
                    ref = { el => this.ybtn = el }
                  >
                    Draw Game
                  </button>

                  <button className = {
                    JSON.parse(event.votes)
                    .filter(vote => vote.userid === user.id && vote.poll === "away-win").length > 0
                    ? "btn-voted btn-grow"
                    : "btn-vote btn-grow" }
                    onClick = { () => {
                      this.onCheck(event.objectId, "away-win")
                      this.zbtn.className = "btn-vote btn-grow";
                    } }
                    ref = { el => this.zbtn = el }
                  >
                    Away Win
                  </button>
                </div>
              </div>
            </section>
          )
        }
      </Fragment>
    );
  }
};

Events.propTypes = {
  auth: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
  onPushNotification: PropTypes.func.isRequired,
  onGetEvents: PropTypes.func.isRequired,
  onSendVote: PropTypes.func.isRequired
};

const mapStateToPropsEvents = state => ({
  auth: state.authState,
  events: state.eventsState.events
});

const mapDispatchToPropsEvents = dispatch => ({
  onPushNotification: () =>
    dispatch(doSetRemoveNotification("YOU CAN ONLY VOTE ONCE. TRY NEXT OR SKIP!", "failure")),
  onSendVote: (objectId, poll) =>
    dispatch(doVoteEventWithErrorCheck(objectId, poll)),
  onGetEvents: () =>
    dispatch(doGetEventsWithErrorCheck())
});

const ConnectedEvents = connect(mapStateToPropsEvents, mapDispatchToPropsEvents)(Events);

export default ConnectedEvents;
