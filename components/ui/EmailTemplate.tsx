import * as React from "react";
import { EmailTemplateProps } from "@/types";

const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  userName,
  totalPrice,
  purchasedCourses,
}) => (
  <table
    width="100%"
    cellPadding="0"
    cellSpacing="0"
    role="presentation"
    style={{ 
      backgroundColor: "#f4f4f4", 
      padding: "40px 0", 
      fontFamily: "Arial, sans-serif",
      WebkitTextSizeAdjust: "100%",
      textSizeAdjust: "100%",
      lineHeight: "1.5"
    }}
  >
    <tbody>
      <tr>
        <td align="center">
          <table
            width="600"
            cellPadding="0"
            cellSpacing="0"
            role="presentation"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid #e0e0e0",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}
          >
            {/* Header */}
            <thead>
              <tr>
                <td
                  align="center"
                  style={{
                    backgroundColor: "#01d2cf",
                    color: "#ffffff",
                    padding: "30px",
                    fontSize: "22px",
                    fontWeight: "bold",
                    letterSpacing: "0.5px",
                    lineHeight: "1.3"
                  }}
                >
                  Your Course Purchase Confirmation
                </td>
              </tr>
            </thead>
            {/* Body */}
            <tbody>
              <tr>
                <td style={{ 
                  padding: "30px", 
                  color: "#333333", 
                  fontSize: "16px", 
                  lineHeight: "1.6",
                  wordBreak: "break-word"
                }}>
                  <h2 style={{ 
                    color: "#01d2cf", 
                    fontSize: "20px", 
                    marginBottom: "15px",
                    fontWeight: "normal"
                  }}>
                    Hello {userName},
                  </h2>
                  <p style={{ marginBottom: "20px" }}>
                    Thank you for your recent purchase. Here are the details of your enrollment:
                  </p>

                  <table
                    width="100%"
                    cellPadding="0"
                    cellSpacing="0"
                    role="presentation"
                    style={{ 
                      marginTop: "20px", 
                      fontSize: "15px", 
                      color: "#555555",
                      borderCollapse: "collapse"
                    }}
                  >
                    <tbody>
                      {purchasedCourses.map((course, index) => (
                        <tr key={index}>
                          <td style={{ 
                            padding: "15px",
                            borderBottom: "1px solid #eeeeee",
                            verticalAlign: "top"
                          }}>
                            <strong style={{ 
                              color: "#333333", 
                              fontSize: "16px",
                              display: "block",
                              marginBottom: "5px"
                            }}>
                              {course.title}
                            </strong>
                            <span
                              style={{
                                display: "inline-block",
                                backgroundColor: "#01d2cf33",
                                color: "#01d2cf",
                                borderRadius: "40px",
                                padding: "3px 10px",
                                fontSize: "12px",
                                fontWeight: "bold",
                                marginBottom: "8px"
                              }}
                            >
                              {course.category}
                            </span>
                            <p style={{ 
                              margin: "8px 0 0",
                              color: "#666666"
                            }}>
                              Price: ${course.price.toFixed(2)}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div style={{ 
                    marginTop: "25px",
                    padding: "15px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "6px"
                  }}>
                    <p style={{ 
                      margin: "0",
                      fontWeight: "bold",
                      color: "#333333"
                    }}>
                      Total Amount Paid: <span style={{ color: "#01d2cf" }}>${totalPrice.toFixed(2)}</span>
                    </p>
                  </div>

                  <div style={{ marginTop: "30px" }}>
                    <a
                      href={`${process.env.NEXT_PUBLIC_BASE_URL}/my-courses`}
                      style={{
                        margin: "10px 5px 10px 0",
                        textAlign: "center",
                        display: "inline-block",
                        padding: "10px 20px",
                        backgroundColor: "#01d2cf",
                        color: "#ffffff",
                        fontSize: "15px",
                        fontWeight: "bold",
                        borderRadius: "4px",
                        textDecoration: "none",
                        minWidth: "160px"
                      }}
                    >
                      Access Your Courses
                    </a>
                    <p style={{ 
                      fontSize: "14px", 
                      color: "#666666", 
                      marginTop: "25px",
                      lineHeight: "1.5"
                    }}>
                      If you didn't make this purchase or have any questions about your order, please reply to this email or contact our <a href="https://yourcompany.com/support" style={{ color: "#01d2cf", textDecoration: "underline" }}>support team</a>.
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
            {/* Footer */}
            <tfoot>
              <tr>
                <td style={{ padding: "0 30px" }}>
                  <hr
                    style={{
                      border: "none",
                      borderTop: "1px solid #e0e0e0",
                      margin: "20px 0",
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td
                  align="center"
                  style={{
                    padding: "0 30px 30px",
                    color: "#888888",
                    fontSize: "12px",
                    lineHeight: "1.5"
                  }}
                >
                  <p style={{ margin: "0 0 10px" }}>
                    This email was sent to you as part of your YourCompany membership.
                  </p>
                  <p style={{ margin: "0 0 10px" }}>
                    <a 
                      href="https://yourcompany.com/unsubscribe" 
                      style={{ 
                        color: "#01d2cf",
                        textDecoration: "underline"
                      }}
                    >
                      Unsubscribe from marketing emails
                    </a> | 
                    <a 
                      href="https://yourcompany.com/preferences" 
                      style={{ 
                        color: "#01d2cf",
                        textDecoration: "underline",
                        marginLeft: "5px"
                      }}
                    >
                      Update preferences
                    </a>
                  </p>
                  <p style={{ 
                    margin: "15px 0 0",
                    fontSize: "11px",
                    lineHeight: "1.4"
                  }}>
                    &copy; {new Date().getFullYear()} YourCompany Inc.<br />
                    123 Business Street, Suite 100<br />
                    City, State 12345, Country<br />
                    <a 
                      href="https://yourcompany.com" 
                      style={{ 
                        color: "#01d2cf",
                        textDecoration: "underline"
                      }}
                    >
                      yourcompany.com
                    </a>
                  </p>
                </td>
              </tr>
            </tfoot>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
);

export default EmailTemplate;