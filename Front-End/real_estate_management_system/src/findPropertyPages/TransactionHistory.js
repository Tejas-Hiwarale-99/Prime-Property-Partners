import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/payments/user/${userId}`);
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchTransactions();
  }, [userId]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.heading}>Transaction History</h2>
        <div style={styles.divider}></div>
      </div>

      {loading ? (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loading}>Loading transactions...</p>
        </div>
      ) : transactions.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📊</div>
          <p style={styles.noData}>No transactions found.</p>
          <p style={styles.noDataSubtext}>Your transaction history will appear here once you make a payment.</p>
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Transaction ID</th>
                <th style={styles.th}>Booking ID</th>
                <th style={styles.th}>Amount (₹)</th>
                <th style={styles.th}>Method</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Transaction Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr key={tx.transactionId} style={{
                  ...styles.tableRow,
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#fafbfc'
                }}>
                  <td style={styles.td}>
                    <span style={styles.transactionId}>{tx.transactionId}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.bookingId}>{tx.bookingId}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.amount}>₹{tx.amount.toLocaleString()}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.paymentMethod}>{tx.paymentMethod}</span>
                  </td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.status,
                        backgroundColor:
                          tx.paymentStatus === 'SUCCESS'
                            ? '#e8f5e8'
                            : tx.paymentStatus === 'REFUNDED'
                              ? '#fff8e1'
                              : '#ffebee',
                        color:
                          tx.paymentStatus === 'SUCCESS'
                            ? '#2e7d32'
                            : tx.paymentStatus === 'REFUNDED'
                              ? '#f57c00'
                              : '#d32f2f',
                        border:
                          tx.paymentStatus === 'SUCCESS'
                            ? '1px solid #c8e6c9'
                            : tx.paymentStatus === 'REFUNDED'
                              ? '1px solid #ffcc02'
                              : '1px solid #ffcdd2',
                      }}
                    >
                      {tx.paymentStatus}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.date}>
                      {new Date(tx.transactionDate).toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Enhanced CSS-in-JS styling
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '40px auto',
    padding: '0 20px',
    fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
    backgroundColor: '#ffffff',
    minHeight: '400px',
    marginTop: '60px'
  },
  header: {
    marginBottom: '32px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '12px',
    letterSpacing: '-0.02em',
  },
  divider: {
    width: '60px',
    height: '3px',
    backgroundColor: '#3b82f6',
    margin: '0 auto',
    borderRadius: '2px',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
  },
  spinner: {
    width: '32px',
    height: '32px',
    border: '3px solid #f3f4f6',
    borderTop: '3px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '16px',
  },
  loading: {
    color: '#6b7280',
    fontSize: '16px',
    fontWeight: '500',
  },
  emptyState: {
    textAlign: 'center',
    padding: '80px 20px',
    color: '#6b7280',
  },
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '20px',
  },
  noData: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px',
  },
  noDataSubtext: {
    fontSize: '14px',
    color: '#9ca3af',
    maxWidth: '400px',
    margin: '0 auto',
  },
  tableContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    overflow: 'hidden',
    border: '1px solid #e5e7eb',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
  },
  tableHeader: {
    backgroundColor: '#f8fafc',
    borderBottom: '2px solid #e5e7eb',
  },
  th: {
    padding: '17px 20px',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: '600',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: '1px solid #e5e7eb',
  },
  tableRow: {
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: '#f9fafb',
    },
  },
  td: {
    padding: '16px 15px',
    borderBottom: '1px solid #f3f4f6',
    verticalAlign: 'middle',
  },
  transactionId: {
    fontFamily: 'Monaco, "Courier New", monospace',
    fontSize: '13px',
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    padding: '4px 8px',
    borderRadius: '4px',
  },
  bookingId: {
    fontFamily: 'Monaco, "Courier New", monospace',
    fontSize: '13px',
    color: '#3b82f6',
    fontWeight: '500',
  },
  amount: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#059669',
  },
  paymentMethod: {
    fontSize: '14px',
    color: '#374151',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  status: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    display: 'inline-block',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  date: {
    fontSize: '13px',
    color: '#6b7280',
    fontWeight: '400',
  },
};

// Add keyframes for spinner animation
const styleSheet = document.createElement('style');
styleSheet.innerText = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default TransactionHistory;