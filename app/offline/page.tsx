export default function Page() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#ffffff",
      }}
    >
      <div style={{ textAlign: "center", padding: "20px", maxWidth: "400px" }}>
        <img
          src="/images/offline/nowifi.gif"
          alt="No WiFi"
          width={200}
          height={200}
          style={{ marginBottom: "20px" }}
        />
        <h1>Oops! The internet took a coffee break.</h1>
        <p>Please connect to the internet and try again.</p>
        <button
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #333",
            color: "#333",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s, color 0.3s",
          }}
        >
          Retry
        </button>
      </div>
    </div>
  );
}
