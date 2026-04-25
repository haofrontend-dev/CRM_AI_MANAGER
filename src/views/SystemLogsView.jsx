import React, { useState } from "react";
import { Button, Dropdown, Space, Typography, Tooltip } from "antd";
import {
  FileTextOutlined,
  DeleteOutlined,
  ExportOutlined,
  FilterOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const INITIAL_LOGS = [
  { time: "22:17:53", level: "INFO", message: "Chuyển sang: logs", source: "[ui.router]" },
  { time: "22:16:37", level: "INFO", message: "Chuyển sang: general", source: "[ui.router]" },
  { time: "22:16:35", level: "INFO", message: "Chuyển sang: ticket", source: "[ui.router]" },
  { time: "22:12:49", level: "INFO", message: "Chuyển sang: logs", source: "[ui.router]" },
  { time: "22:11:34", level: "INFO", message: "Chuyển sang: ticket", source: "[ui.router]" },
  { time: "22:03:05", level: "INFO", message: "Chuyển sang: chat", source: "[ui.router]" },
  { time: "22:03:03", level: "INFO", message: "Chuyển sang: general", source: "[ui.router]" },
  { time: "22:03:02", level: "INFO", message: "Chuyển sang: reports", source: "[ui.router]" },
  { time: "22:03:01", level: "INFO", message: "Chuyển sang: customers", source: "[ui.router]" },
  { time: "22:03:00", level: "INFO", message: "Chuyển sang: logs", source: "[ui.router]" },
  { time: "22:02:59", level: "INFO", message: "Chuyển sang: db", source: "[ui.router]" },
  { time: "21:01:37", level: "INFO", message: "Chuyển sang: general", source: "[ui.router]" },
  { time: "20:48:25", level: "INFO", message: "Chuyển sang: chat", source: "[ui.router]" },
  { time: "20:38:51", level: "INFO", message: "Chuyển sang: general", source: "[ui.router]" },
  { time: "20:38:50", level: "INFO", message: "Chuyển sang: home", source: "[ui.router]" },
  { time: "20:38:47", level: "INFO", message: "Chuyển sang: logs", source: "[ui.router]" },
  { time: "20:38:47", level: "INFO", message: "Chuyển sang: customers", source: "[ui.router]" },
  { time: "20:38:46", level: "INFO", message: "Chuyển sang: customers", source: "[ui.router]" },
  { time: "20:38:45", level: "INFO", message: "Chuyển sang: logs", source: "[ui.router]" },
  { time: "20:38:43", level: "INFO", message: "Chuyển sang: db", source: "[ui.router]" },
  { time: "20:38:39", level: "INFO", message: "Chuyển sang: ticket", source: "[ui.router]" },
  { time: "20:38:28", level: "INFO", message: "Chuyển sang: marketing", source: "[ui.router]" },
  { time: "20:38:28", level: "INFO", message: "Chuyển sang: general", source: "[ui.router]" },
  { time: "20:28:01", level: "INFO", message: "Chuyển sang: chat", source: "[ui.router]" },
  { time: "20:27:43", level: "INFO", message: "Chuyển sang: home", source: "[ui.router]" },
  { time: "20:27:38", level: "INFO", message: "Chuyển sang: chat", source: "[ui.router]" },
  { time: "20:27:37", level: "INFO", message: "Chuyển sang: home", source: "[ui.router]" },
  { time: "20:27:33", level: "INFO", message: "Chuyển sang: chat", source: "[ui.router]" },
  { time: "20:27:30", level: "INFO", message: "Chuyển sang: home", source: "[ui.router]" },
  { time: "20:27:25", level: "INFO", message: "Chuyển sang: ticket", source: "[ui.router]" },
  { time: "20:27:09", level: "INFO", message: "Chuyển sang: chat", source: "[ui.router]" },
  { time: "09:15:32", level: "OK", message: "Tin nhắn mới từ Nguyễn Anh Tuấn qua Zalo", source: "[chat.service]" },
  { time: "09:15:33", level: "INFO", message: "AI Agent \"Minh\" xử lý intent: product_inquiry", source: "[agent.minh]" },
  { time: "09:15:34", level: "OK", message: "API call: fetch_product_prices - 200 OK (0.34s)", source: "[api.client]" },
  { time: "09:15:35", level: "OK", message: "Phản hồi AI gửi thành công qua Zalo", source: "[channel.zalo]" },
  { time: "09:14:12", level: "INFO", message: "Ticket T-0247 được tạo tự động bởi AI", source: "[ticket.service]" },
  { time: "09:14:13", level: "OK", message: "Thông báo Zalo group #support-team gửi thành công", source: "[zalo.notify]" },
  { time: "09:12:45", level: "WARN", message: "Zalo rate limit: 85% quota sử dụng trong 1 giờ", source: "[channel.zalo]" },
  { time: "09:10:22", level: "INFO", message: "Sync Odoo: 23 leads mới đồng bộ thành công", source: "[odoo.sync]" },
  { time: "09:08:05", level: "OK", message: "Lead 01247 tạo trên Odoo từ hội thoại Score-247", source: "[odoo.client]" },
  { time: "09:05:17", level: "ERROR", message: "Webhook Facebook timeout sau 30s - retry 1/3", source: "[webhook.fb]" },
  { time: "09:05:48", level: "OK", message: "Webhook Facebook retry thành công", source: "[webhook.fb]" },
  { time: "09:02:33", level: "INFO", message: "Social Listening crawl hoàn tất: +25 leads", source: "[crawl.service]" },
  { time: "09:00:00", level: "INFO", message: "NexusAI khởi động - 5 agent online", source: "[system]" },
];

export default function SystemLogsView() {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [filter, setFilter] = useState("ALL");

  const handleClear = () => {
    setLogs([]);
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "INFO": return "#1677ff"; // Blue
      case "OK": return "#52c41a"; // Green
      case "WARN": return "#faad14"; // Orange/Yellow
      case "ERROR": return "#cf1322"; // Red
      default: return "#595959"; // Gray
    }
  };

  const filteredLogs = filter === "ALL" ? logs : logs.filter(log => log.level === filter);

  const errors = logs.filter(l => l.level === "ERROR").length;
  const warns = logs.filter(l => l.level === "WARN").length;
  const successes = logs.filter(l => l.level === "OK").length;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f8f9fa", fontFamily: "Consolas, 'Courier New', monospace" }}>
      {/* Header */}
      <div style={{ padding: "16px 24px", background: "#fff", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>
        <Space align="center" size={12}>
          <FileTextOutlined style={{ fontSize: 24, color: "#1677ff" }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#1f1f1f" }}>System Logs</div>
            <div style={{ fontSize: 12, color: "#8c8c8c" }}>Toàn bộ hoạt động hệ thống được ghi lại real-time</div>
          </div>
        </Space>
        <Space>
          <Dropdown
            menu={{
              items: [
                { key: 'ALL', label: 'Tất cả' },
                { key: 'INFO', label: 'INFO' },
                { key: 'OK', label: 'OK (Success)' },
                { key: 'WARN', label: 'WARN' },
                { key: 'ERROR', label: 'ERROR' },
              ],
              onClick: (e) => setFilter(e.key)
            }}
          >
            <Button size="small" icon={<FilterOutlined />}>{filter === "ALL" ? "Tất cả" : filter}</Button>
          </Dropdown>
          <Button size="small" icon={<DeleteOutlined />} onClick={handleClear}>Xoá</Button>
          <Button size="small" type="primary" style={{ background: "#9254de" }} icon={<ExportOutlined />}>Export</Button>
        </Space>
      </div>

      {/* Stats Bar */}
      <div style={{ padding: "8px 24px", background: "#fafafa", borderBottom: "1px solid #f0f0f0", fontSize: 12, display: "flex", gap: 16 }}>
        <Text type="secondary">Total: <span style={{ color: "#1f1f1f", fontWeight: 600 }}>{logs.length}</span></Text>
        <Text type="secondary">Errors: <span style={{ color: "#cf1322", fontWeight: 600 }}>{errors}</span></Text>
        <Text type="secondary">Warns: <span style={{ color: "#faad14", fontWeight: 600 }}>{warns}</span></Text>
        <Text type="secondary">Success: <span style={{ color: "#52c41a", fontWeight: 600 }}>{successes}</span></Text>
      </div>

      {/* Log Area */}
      <div style={{ flex: 1, padding: "16px 24px", overflowY: "auto", fontSize: 13, lineHeight: "1.8", color: "#595959" }}>
        {filteredLogs.length > 0 ? (
          filteredLogs.map((log, index) => (
            <div key={index} style={{ display: "flex", borderBottom: "1px solid transparent" }} className="log-line">
              <span style={{ width: 80, flexShrink: 0, opacity: 0.7 }}>{log.time}</span>
              <span style={{ width: 60, flexShrink: 0, color: getLevelColor(log.level), fontWeight: 600 }}>{log.level}</span>
              <span style={{ flex: 1, color: "#1f1f1f", whiteSpace: "pre-wrap" }}>{log.message}</span>
              <span style={{ opacity: 0.5, flexShrink: 0, textAlign: "right", marginLeft: 16 }}>{log.source}</span>
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", color: "#bfbfbf", marginTop: 40, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>
            Không có dữ liệu log.
          </div>
        )}
      </div>

      <style>{`
        .log-line:hover {
          background-color: rgba(0,0,0,0.02);
        }
      `}</style>
    </div>
  );
}
