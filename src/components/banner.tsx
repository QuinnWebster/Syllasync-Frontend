interface BannerProps {
  googleSignIn?: () => void;
  signOut?: () => void;
  wantButtons?: boolean;
  signInText?: boolean;
}
const Banner: React.FC<BannerProps> = ({
  googleSignIn,
  signOut,
  wantButtons = null,
  signInText,
}) => {
  const buttonStyles: React.CSSProperties = {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#1976d2",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    fontFamily: "'Roboto', sans-serif",
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#1976d2",
        width: "100%",
        height: "120px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h1
          style={{
            fontWeight: "bold",
            color: "#eeeeee",
            margin: "0",
            fontSize: "3rem",
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Syllasync
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginLeft: "auto",
        }}
      >
        {!signInText && wantButtons && googleSignIn && signOut && (
          <>
            <button
              style={{
                ...buttonStyles,
                backgroundColor: "#f5f5f5",
              }}
              onClick={googleSignIn}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#e0e0e0")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#f5f5f5")
              }
            >
              Switch Account
            </button>

            <button
              style={{
                ...buttonStyles,
                backgroundColor: "#f5f5f5",
              }}
              onClick={signOut}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#e0e0e0")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#f5f5f5")
              }
            >
              Sign Out
            </button>
          </>
        )}

        {signInText && googleSignIn && (
          <button
            style={{
              ...buttonStyles,
              backgroundColor: "#f5f5f5",
            }}
            onClick={googleSignIn}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#e0e0e0")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#f5f5f5")
            }
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Banner;
