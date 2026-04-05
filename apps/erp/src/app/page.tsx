"use client";
import Link from "next/link";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { Card, Layout } from "@repo/shared";

export default function HomePage() {
  return (
    <Layout>
      <Layout.Header>
        <h1>ระบบคำนวณราคาขนส่ง</h1>
      </Layout.Header>
      <Layout.Content>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "80vh",
          }}
        >
          <div
            style={{
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              maxWidth: "400px",
              width: "100%",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Card variant="elevated" fullWidth>
              <div style={{ marginBottom: "1rem", textAlign: "center" }}>
                <CurrencyDollarIcon
                  style={{ width: "3rem", height: "3rem", color: "#0070f3" }}
                />
              </div>
              <h2
                style={{
                  marginBottom: "0.5rem",
                  color: "#333",
                  textAlign: "center",
                }}
              >
                คำนวณราคาขนส่ง
              </h2>
              <p
                style={{
                  color: "#666",
                  marginBottom: "1.5rem",
                  textAlign: "center",
                }}
              >
                คำนวณราคาขนส่งตามน้ำหนักและพื้นที่จัดส่ง
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                }}
              >
                <Link
                  href="/th/pricing"
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <button
                    style={{
                      padding: "0.75rem 2rem",
                      backgroundColor: "#0070f3",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#0051cc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#0070f3";
                    }}
                  >
                    เริ่มคำนวณ
                  </button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </Layout.Content>
      <Layout.Footer>
        <p>© 2024 ERP Front-end. All rights reserved.</p>
      </Layout.Footer>
    </Layout>
  );
}
