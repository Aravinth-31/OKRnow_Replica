import React from 'react';
import '../styles/Dashboard.css';

class Dashboard extends React.Component {
    componentDidMount() {
    }
    render() {
        return (
            <div className="dash">
                <div className="row head">
                    <div className="col col-8 title">
                        <h4>Dashboard</h4>
                    </div>
                    <div className="col col-2 quarter">
                        <label>CHANGE<br />QUARTER</label>
                    </div>
                    <div className="col col-2 quarter-list">
                        <input list="brow" placeholder="Q1" />
                        <datalist id="brow">
                            <option value="Q1" />
                            <option value="Q2" />
                        </datalist>
                    </div>
                </div>
                <br />
                <table className="prog">
                    <tbody>
                        <tr>
                            <td>
                                <div style={{ borderBottom: '5px solid #33ccff' }} >
                                    <div className="label">Exceeded </div><div className="count">00</div>
                                </div>
                            </td>
                            <td>
                                <div style={{ borderBottom: '5px solid orange' }}>
                                    <div className="label">On Track </div><div className="count">05</div>
                                </div>
                            </td>
                            <td>
                                <div style={{ borderBottom: '5px solid red' }}>
                                    <div className="label">At Risk </div><div className="count">00</div>
                                </div>
                            </td>
                            <td>
                                <div style={{ borderBottom: '5px solid green' }}>
                                    <div className="label">Completed </div><div className="count">00</div>
                                </div>
                            </td>
                            <td>
                                <div style={{ borderBottom: '5px solid grey' }}>
                                    <div className="label">Total </div><div className="count">05</div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br />
                {/* <div className="progresss container-fluid">
                    <div style={{ padding: '10px' }}>
                        <div style={{ borderBottom: '5px solid #33ccff' }} >
                            <div className="label">Exceeded </div><div className="count">00</div>
                        </div>
                    </div>
                    <div style={{ padding: '10px' }}>
                        <div style={{ borderBottom: '5px solid orange'}}>
                            <div className="label">On Track</div> <div className="count">05</div></div>
                    </div>
                    <div style={{ padding: '10px' }}>
                        <div style={{ borderBottom: '5px solid red' }}>
                            <div className="label">At Risk </div><div className="count">00</div>
                        </div>
                    </div>
                    <div style={{ padding: '10px' }}>
                        <div style={{ borderBottom: '5px solid green' }}>
                            <div className="label">Completed </div><div className="count">00</div>
                        </div>
                    </div>
                    <div style={{ padding: '10px' }}>
                        <div style={{ borderBottom: '5px solid grey' }}>
                            <div className="label">Total </div><div className="count">05</div>
                        </div>
                    </div>
                </div>
                <br /> */}
                <div className="row row1">
                    <div className="col col-6">
                        <div className="title">Top Performing Departments</div>
                        <div className="content">No Data</div>
                    </div>
                    <div className="col col-6">
                        <div className="title">Top Performing Employees</div>
                        <div className="content">No Data</div>
                    </div>
                </div>
                <br />
                <br />
                <div className="row row1">
                    <div className="col col-6">
                        <div className="title">Low Performing Departments</div>
                        <div className="content">No Data</div>
                    </div>
                    <div className="col col-6">
                        <div className="title">Top OKR Champions</div>
                        <div className="content">No Data</div>
                    </div>
                </div>
                <br />
                <br />
            </div>
        );
    }
}
export default Dashboard;