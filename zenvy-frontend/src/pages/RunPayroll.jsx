import api from "../api/api";

const RunPayroll = () => {
  const run = async () => {
    await api.post("/payroll/run");
    alert("Payroll processed");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Run Payroll</h2>
        <button onClick={run}>Run</button>
      </div>
    </div>
  );
};

export default RunPayroll;
