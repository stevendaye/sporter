import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import deepFreeze from "deep-freeze";
import App from './App';
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Notifications from "./components/layout/Notifications";
import NotFound from "./components/layout/NotFound";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Events from "./components/dashbord/Events";
import Routes from "./components/routes/Routes";
import PrivateRoute from "./components/routes/PrivateRoute";
import { doStoreEvents, doSetEvents } from "./actions/events";
import { doRegisterSuccess, doLoadUser } from "./actions/auth";
import eventsReducer from "./reducers/events";
import authReducer from "./reducers/auth";

/* ## Create test suites for testing components ## */
/* React Components */
describe("App", () => {
  // Test rendition of component
  it("renders without crashing", ()=> {
    const div = document.createElement('div');
    ReactDOM.render(
      <App />, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  // Test snapshot for future tests
  it("has a valid snapshot", done => {
    const component = renderer.create(<App/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  });
});

describe("Navabar", () => {
  it("renders without crashing", done => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Navbar/>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("has valid snapshot", done => {
    const component = renderer.create(<Navbar/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  });
});

describe("Landing", ()=> {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Landing/>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("has valid snapshot", done => {
    const component = renderer.create(<Navbar/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  });
});

describe("Footer", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Footer/>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("has valid snapshot", done => {
    const component = renderer.create(<Footer/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  });
});

describe("Register", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Register/>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("has valid snapshot", done => {
    const component = renderer.create(<Register/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  });
});

describe("Login", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Login/>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("has valid snapshot", done => {
    const component = renderer.create(<Login/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  });
});

describe("Notifications", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Notifications/>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("has a valid snapshot", done => {
    const component = renderer.create(<Notifications/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  });
});

describe("NotFound", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <NotFound/>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("has a valid snapshot", done => {
    const component = renderer.create(<NotFound/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  });
});

describe("Events", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Events/>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("has a valid snapshot", done => {
    const component = renderer.create(<Events/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done()
  });
});

describe("Routes", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Routes/>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("has a valid snapshot", done => {
    const component = renderer.create(<Routes/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  });
});

describe("PrivateRoute", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <PrivateRoute/>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("has a valid snapshot", done => {
    const component = renderer.create(<PrivateRoute/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  });
});


/* ## Create Test suites for testing Reducers and Action Creators and Selectors ## */
/* Action Creators */
describe("Store Events Action", () => {
  it("stores events", done => {
    const events = [{
      awayName: "Panthrakikos Komotini",
      createdAt: "2015-12-18T12:30:39.228Z",
      group: "Greek Cup",
      homeName: "Chania FC",
      id: 1002916450,
      name: "Chania FC - Panthrakikos Komotini",
      objectId: "1UaQjc7lIb",
      sport: "FOOTBALL",
      country: "ENGLAND",
      state: "STARTED"
    }];

    const action = doStoreEvents(events);
    const expectation = {
      type: "EVENTS_STORE",
      events
    };
    expect(action).toStrictEqual(expectation);
    done();
  });
});

describe("Get Events Action", () => {
  it("gets events", done => {
    const events = [{
      awayName: "Panthrakikos Komotini",
      createdAt: "2015-12-18T12:30:39.228Z",
      group: "Greek Cup",
      homeName: "Chania FC",
      id: 1002916450,
      name: "Chania FC - Panthrakikos Komotini",
      objectId: "1UaQjc7lIb",
      sport: "FOOTBALL",
      country: "ENGLAND",
      state: "STARTED"
    }];

    const action = doSetEvents(events);
    const expectation = {
      type: "EVENTS_GET",
      events
    };
    expect(action).toStrictEqual(expectation);
    done();
  });
});

describe("Register User Action", () => {
  it("register user", done => {
    const token = "V6jd702hdNS673HldG6S2fkK92HS692HV642Lhkd3hdh394";
    const action = doRegisterSuccess(token);
    const expectation = {
      type: "REGISTER_SUCCESS",
      token
    };
    expect(action).toStrictEqual(expectation);
    done();
  });
});

describe("Load User Action", () => {
  it("loads user", done => {
    const user = {
      avatar: "//www.gravatar.com/avatar/4d73599996d6e6a4a84c88fc6f6ebc13?s=200&r=pg&d=mm",
      email: "elienoma@yahoo.com",
      id: "84e3979e-fa1a-40f0-b951-7ee3e7aa275f",
      name: "Elie Noma",
      provider: "local",
      timestamp: "2019-12-04T18:15:22.187Z"
    };
    const action = doLoadUser(user);
    const expectation = {
      type: "USER_LOADED",
      user
    };
    expect(action).toStrictEqual(expectation);
    done();
  });
});

/* Reducers */
describe("Events Reducer", () => {
  it("populates events in the events state", done => {
    const events = [{
      awayName: "Panthrakikos Komotini",
      createdAt: "2015-12-18T12:30:39.228Z",
      group: "Greek Cup",
      homeName: "Chania FC",
      id: 1002916450,
      name: "Chania FC - Panthrakikos Komotini",
      objectId: "1UaQjc7lIb",
      sport: "FOOTBALL",
      country: "ENGLAND",
      state: "STARTED"
    }];
    const prevState = {
      events: [],
      event: null,
      isLoading: true,
      message: ""
    };
    const esxpectedNewState = {
      events,
      event: null,
      isLoading: true,
      message: ""
    };
    const action = {
      type: "EVENTS_STORE",
      events
    };
    deepFreeze(prevState);

    const newState = eventsReducer(prevState, action);
    expect(newState).toStrictEqual(esxpectedNewState);
    done();
  });
});

describe("Auth Reducer", () => {
  it("puts user credentials in the auth state", done => {
    const user = {
      avatar: "//www.gravatar.com/avatar/4d73599996d6e6a4a84c88fc6f6ebc13?s=200&r=pg&d=mm",
      email: "elienoma@yahoo.com",
      id: "84e3979e-fa1a-40f0-b951-7ee3e7aa275f",
      name: "Elie Noma",
      provider: "local",
      timestamp: "2019-12-04T18:15:22.187Z"
    };
    const prevState = {
      user: null,
      token: "V6jd702hdNS673HldG6S2fkK92HS692HV642Lhkd3hdh394",
      isAuthenticated: true,
      isLoading: false
    };
    const action = {
      type: "USER_LOADED",
      user
    };
    const esxpectedNewState = {
      user: {
        avatar: "//www.gravatar.com/avatar/4d73599996d6e6a4a84c88fc6f6ebc13?s=200&r=pg&d=mm",
        email: "elienoma@yahoo.com",
        id: "84e3979e-fa1a-40f0-b951-7ee3e7aa275f",
        name: "Elie Noma",
        provider: "local",
        timestamp: "2019-12-04T18:15:22.187Z"
      },
      token: "V6jd702hdNS673HldG6S2fkK92HS692HV642Lhkd3hdh394",
      isAuthenticated: true,
      isLoading: false
    };
    deepFreeze(prevState);

    const newState = authReducer(prevState, action);
    expect(newState).toStrictEqual(esxpectedNewState);
    done();
  });
});

/* Selectors */
// Selectors test goes here
