import React from "react";

function Footer() {
  const styles = {
    footer: {
      backgroundColor: "#ffffff",
      padding: "20px",
      marginTop: "20px",
      borderTop: "1px solid #ddd",
      textAlign: "center",
    },
    logo: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#9C27B0",
      marginBottom: "10px",
    },
    text: {
      color: "#555",
      fontSize: "14px",
      lineHeight: "1.6",
      marginBottom: "15px",
    },
    links: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      marginBottom: "15px",
      flexWrap: "wrap",
    },
    link: {
      color: "#9C27B0",
      textDecoration: "none",
      fontWeight: "bold",
      cursor: "pointer",
    },
    social: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      fontSize: "24px",
      marginBottom: "15px",
    },
    copyright: {
      color: "#888",
      fontSize: "13px",
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.logo}>meesho</div>

      <p style={styles.text}>
        Shop the latest fashion, beauty, home, kitchen, electronics, and more
        at the best prices.
      </p>

      <div style={styles.links}>
        <a href="#" style={styles.link}>About</a>
        <a href="#" style={styles.link}>Contact</a>
        <a href="#" style={styles.link}>Privacy</a>
        <a href="#" style={styles.link}>Help</a>
      </div>

      <div style={styles.social}>
        <span>📘</span>
        <span>📸</span>
        <span>🐦</span>
        <span>▶️</span>
      </div>

      <p style={styles.copyright}>
        © 2026 Meesho Clone. All Rights Reserved.
      </p>
    </footer>
  );
}


export default Footer;
