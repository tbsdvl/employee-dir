// import React & API
import React from "react";
import API from "./utils/API";

// Create App class component
class App extends React.Component {
  // Create state for user's search and return an
  // array of employees and their results from API
  state = {
    search: "",
    employees: [],
  };

  // Once component displays on app, request an array of employees
  // with specific information
  componentDidMount() {
    this.getEmployees();
  }

  // From our employees array, return their information
  // including their name, email, phone number, date of birth,
  // and an image of the employee
  getEmployees = async () => {
    const { data } = await API.getUsers();
    const employees = data.results.map((item) => ({
      name: item.name.first + " " + item.name.last,
      email: item.email,
      phone: item.cell,
      dob: item.dob.date,
      image: item.picture.thumbnail,
    }));
    this.setState({ employees });
  };

  // When a user enters a value in the search bar
  // Return any employees that contain information
  // That includes the user's search value
  // If there are none, return no employees
  // If a user searches for an image, continue
  // through the for loop
  filterEmployees = (employee) => {
    let userSearch = this.state.search;

    for (const key in employee) {
      if (key === "image") continue;
      if (employee[key].includes(userSearch)) {
        return true;
      }
    }

    return false;
  };

  render() {
    console.log(this.state.employees);

    const { employees } = this.state;
    return (
      <table>
        <thead>
          <th>image</th>
          <th>name</th>
          <th>phone</th>
          <th>email</th>
          <th>dob</th>
          <div>
          <form>
            <div className="form-group">
              <label htmlFor="search">Search:</label>
              <input
                // onChange={props.handleInputChange}
                value={this.search}
                name="search"
                type="text"
                className="form-control"
                placeholder="Search for an employee"
                id="search"
              />
              {/* onClick={props.handleFormSubmit} */}
              <button className="btn btn-primary mt-3">Search</button>
            </div>
          </form>
          </div>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <h2>No Employees!</h2>
          ) : (
            employees.filter(this.filterEmployees).map((employee) => (
              <tr>
                <td>
                  <img src={employee.image} alt="userpic" />
                </td>
                <td>{employee.name}</td>
                <td>{employee.phone}</td>
                <td>{employee.email}</td>
                <td>{employee.dob}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  }
}

export default App;