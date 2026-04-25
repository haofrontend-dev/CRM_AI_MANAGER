import React, { useState, useRef, useEffect } from "react";
import {
  Badge,
  Avatar,
  Input,
  Tag,
  Space,
  Button,
  Typography,
  Descriptions,
  Timeline,
  Grid,
  Drawer,
} from "antd";
import {
  SearchOutlined,
  PhoneOutlined,
  PlusOutlined,
  EyeOutlined,
  RobotOutlined,
  UserSwitchOutlined,
  CheckCircleOutlined,
  SendOutlined,
  AppstoreOutlined,
  ShopOutlined,
  FacebookFilled,
  MenuOutlined,
  ClusterOutlined,
  EnvironmentOutlined,
  MessageOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

function getInitials(name) {
  if (!name) return "U";
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
}

const MOCK_CHANNEL_GROUPS = [
  { id: "all", name: "Tất cả kênh", count: 4, type: "total" },
  { id: "brand_b", name: "chi nhánh B", count: 2, type: "branch" },
  { id: "all_branches", name: "tất cả chi nhánh", count: 3, type: "group" },
  { id: "brand_1", name: "chi nhánh 1", count: 1, type: "branch" },
  { id: "brand_a", name: "chi nhánh A", count: 1, type: "branch" },
  { id: "fb", name: "Facebook", count: null, type: "channel" },
  { id: "aba", name: "ABA - Automation Busi...", count: null, type: "bot" },
];

export default function ConversationsPage({
  conversations,
  activeConversation,
  onConversationChange,
  onOpenConversation,
  onOpenCreateTicketModal,
  onAssignConversationOwner,
  onSendConversationReply,
  onCallConversationLead,
  onMarkConversationDone,
  isMobile,
  isTablet,
  customerType,
}) {
  const screens = useBreakpoint();
  const isSmallDesktop = screens.lg && !screens.xl; // between 992 and 1200px
  const isCompactLayout = isTablet || isSmallDesktop;

  const [chatInput, setChatInput] = useState("");
  const [channelFilter, setChannelFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [showInfoPanel, setShowInfoPanel] = useState(!isMobile && !isCompactLayout);
  const [isChatVisible, setIsChatVisible] = useState(false); // For mobile view toggle
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [showGroupDrawer, setShowGroupDrawer] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.id, activeConversation?.messages?.length, isChatVisible]);

  const filteredConversations = conversations.filter((c) => {
    let matchGroup = false;
    if (selectedGroup === "all") matchGroup = true;
    else if (selectedGroup === "all_branches") matchGroup = ["brand_b", "brand_1", "brand_a"].includes(c.groupId);
    else matchGroup = c.groupId === selectedGroup;

    const matchChannel = channelFilter === "all" || c.channel.toLowerCase() === channelFilter;
    const matchSearch = !searchText || c.name.toLowerCase().includes(searchText.toLowerCase());
    return matchGroup && matchChannel && matchSearch;
  });

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    onSendConversationReply(activeConversation.id, chatInput);
    setChatInput("");
  };

  const channelColor = {
    Zalo: "#0068ff",
    Facebook: "#1877f2",
    Web: "#0F6E56",
    Email: "#fa8c16",
  };

  const panelHeight = isMobile ? "calc(100vh - 150px)" : "100%";

  const renderChannelGroups = () => (
    <div style={{ padding: "12px 8px" }}>
      {MOCK_CHANNEL_GROUPS.map(group => {
        const isActive = selectedGroup === group.id;
        return (
          <div
            key={group.id}
            onClick={() => {
              setSelectedGroup(group.id);
              if (isCompactLayout) setShowGroupDrawer(false);
            }}
            style={{
              position: "relative",
              padding: "10px 14px",
              margin: "0 0 6px",
              borderRadius: 8,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: isActive ? "#E6F3EF" : "transparent",
              color: isActive ? "#0F6E56" : "#595959",
              fontWeight: isActive ? 600 : 500,
              transition: "all 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.background = "#f5f5f5";
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.background = "transparent";
            }}
          >
            {isActive && (
              <div style={{ position: "absolute", left: 0, top: "20%", bottom: "20%", width: 4, background: "#0F6E56", borderTopRightRadius: 4, borderBottomRightRadius: 4 }} />
            )}
            <Space size={12}>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 24,
                height: 24,
                borderRadius: 6,
                background: isActive ? "#fff" : "#f0f0f0",
                color: isActive ? "#0F6E56" : "#8c8c8c",
                transition: "all 0.2s"
              }}>
                {group.type === "total" && <MessageOutlined style={{ fontSize: 13 }} />}
                {group.type === "group" && <ClusterOutlined style={{ fontSize: 13 }} />}
                {group.type === "branch" && <EnvironmentOutlined style={{ fontSize: 13 }} />}
                {group.type === "channel" && <FacebookFilled style={{ fontSize: 13, color: isActive ? "#0F6E56" : "#1877F2" }} />}
                {group.type === "bot" && <RobotOutlined style={{ fontSize: 13 }} />}
              </div>
              <Text style={{ color: "inherit", fontSize: 13, userSelect: "none" }}>{group.name}</Text>
            </Space>
            {group.count !== null && (
              <Badge
                count={group.count}
                style={{
                  backgroundColor: isActive ? "#0F6E56" : "#d9d9d9",
                  color: "#fff",
                  boxShadow: "none",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );

  const renderInfoPanelContent = () => {
    if (!activeConversation) return null;
    return (
      <div style={{ paddingBottom: 24 }}>
        {/* Customer Profile */}
        <div style={{ padding: "20px 16px", textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>
          <Avatar size={56} style={{ background: activeConversation.avatarColor, fontSize: 20 }}>{getInitials(activeConversation.name)}</Avatar>
          <Title level={5} style={{ margin: "10px 0 4px" }}>{activeConversation.name}</Title>
          <Space size={4}>
            <Tag style={{ background: channelColor[activeConversation.channel] || "#999", color: "#fff", border: "none", borderRadius: 4, fontSize: 11 }}>{activeConversation.channel}</Tag>
            <Tag color={activeConversation.status.color}>{activeConversation.status.label}</Tag>
          </Space>
        </div>

        {/* Contact Info */}
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #f0f0f0" }}>
          <Text type="secondary" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Thông tin liên hệ</Text>
          <Descriptions column={1} size="small" style={{ marginTop: 8 }} labelStyle={{ fontSize: 12, color: "#8c8c8c", width: 80 }} contentStyle={{ fontSize: 12 }}>
            <Descriptions.Item label="SĐT">{activeConversation.phone}</Descriptions.Item>
            <Descriptions.Item label="Dự án">{activeConversation.project}</Descriptions.Item>
            <Descriptions.Item label="Ngân sách">{activeConversation.budget}</Descriptions.Item>
            <Descriptions.Item label="Owner">{activeConversation.owner}</Descriptions.Item>
          </Descriptions>
        </div>

        {/* AI Analysis */}
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #f0f0f0" }}>
          <Space size={6} style={{ marginBottom: 8 }}>
            <RobotOutlined style={{ color: "#0F6E56" }} />
            <Text type="secondary" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>AI phân tích</Text>
          </Space>
          <div style={{ background: "#e6f7ff", padding: "8px 12px", borderRadius: 8, marginBottom: 8 }}>
            <Text strong style={{ fontSize: 13 }}>{activeConversation.intent}</Text>
          </div>
          <Text type="secondary" style={{ fontSize: 12, lineHeight: 1.6 }}>{activeConversation.aiSummary}</Text>
        </div>

        {/* Next Step */}
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #f0f0f0" }}>
          <Text type="secondary" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Bước tiếp theo</Text>
          <div style={{ background: "#f6ffed", padding: "8px 12px", borderRadius: 8, marginTop: 8, border: "1px solid #b7eb8f" }}>
            <Text style={{ fontSize: 12, lineHeight: 1.6 }}>{activeConversation.nextStep}</Text>
          </div>
        </div>

        {/* Form Odoo Lead */}
        <div style={{ padding: "16px", borderBottom: "1px solid #f0f0f0" }}>
          <Space size={6} style={{ marginBottom: 8 }}>
            <CloudUploadOutlined style={{ color: "#fa8c16", fontSize: 16 }} />
            <Text type="secondary" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>Form - Odoo Lead</Text>
          </Space>
          <div style={{ background: "#fffbe6", padding: "12px", borderRadius: 8, border: "1px solid #ffe58f" }}>
            <Descriptions column={1} size="small" labelStyle={{ fontSize: 12, color: "#8c8c8c", width: 85 }} contentStyle={{ fontSize: 12, fontWeight: 500 }}>
              <Descriptions.Item label="Tên Lead" style={{ paddingBottom: 4 }}>{activeConversation.name}</Descriptions.Item>
              <Descriptions.Item label="Nguồn" style={{ paddingBottom: 4 }}>{activeConversation.channel}</Descriptions.Item>
              <Descriptions.Item label="Sản phẩm" style={{ paddingBottom: 4 }}>{activeConversation.project || "Chưa xác định"}</Descriptions.Item>
              <Descriptions.Item label="Ngân sách" style={{ paddingBottom: 4 }}>{activeConversation.budget}</Descriptions.Item>
              <Descriptions.Item label="Phân công" style={{ paddingBottom: 4 }}>{activeConversation.owner}</Descriptions.Item>
              <Descriptions.Item label="Ghi chú" style={{ paddingBottom: 4 }}>Khách hàng tiềm năng, cần follow sát</Descriptions.Item>
            </Descriptions>
            <Button block type="primary" style={{ background: "#fa8c16", borderColor: "#fa8c16", marginTop: 12, borderRadius: 6, fontWeight: 500 }} icon={<CloudUploadOutlined />}>
              Đồng bộ lên Odoo
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #f0f0f0" }}>
          <Text type="secondary" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8, display: "block" }}>Hành động</Text>
          <Space direction="vertical" size={6} style={{ width: "100%" }}>
            <Button block size="small" type="primary" icon={<PhoneOutlined />} onClick={() => onCallConversationLead(activeConversation.id)}>Gọi khách</Button>
            <Button block size="small" icon={<PlusOutlined />} onClick={() => onOpenCreateTicketModal(activeConversation.id)}>Tạo ticket</Button>
            <Button block size="small" icon={<UserSwitchOutlined />} onClick={() => onAssignConversationOwner(activeConversation.id)}>Điều phối owner</Button>
            <Button block size="small" icon={<CheckCircleOutlined />} onClick={() => onMarkConversationDone(activeConversation.id)}>Hoàn tất</Button>
          </Space>
        </div>

        {/* Timeline */}
        <div style={{ padding: "12px 16px" }}>
          <Text type="secondary" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10, display: "block" }}>Timeline</Text>
          <Timeline items={activeConversation.timeline.map((entry) => ({ children: <Text style={{ fontSize: 12 }}>{entry}</Text>, color: "green" }))} />
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: "flex", gap: 0, borderRadius: 12, overflow: "hidden", border: "1px solid #e8e8e8", background: "#fff", height: panelHeight, position: "relative" }}>

      {/* ─── Column 0: Channel Groups (Desktop) ─── */}
      {!isCompactLayout && (
        <div style={{ width: 220, minWidth: 220, borderRight: "1px solid #f0f0f0", background: "#fcfcfc", display: "flex", flexDirection: "column", height: panelHeight }}>
          <div style={{ padding: "16px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center" }}>
            <Text strong style={{ fontSize: 13, textTransform: "uppercase" }}>Gộp Kênh Chat</Text>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {renderChannelGroups()}
          </div>
        </div>
      )}

      {/* ─── Column 1: Inbox List ─── */}
      {(!isMobile || !isChatVisible) && (
        <div className="pancake-inbox" style={{ width: isMobile ? "100%" : (isCompactLayout ? 280 : 300), minWidth: isMobile ? "auto" : (isCompactLayout ? 280 : 300), borderRight: isMobile ? "none" : "1px solid #f0f0f0", display: "flex", flexDirection: "column", height: panelHeight, background: "#fff" }}>
          {/* Inbox Header */}
          <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid #f0f0f0" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <Space>
                {isCompactLayout && (
                  <Button type="text" icon={<MenuOutlined />} size="small" onClick={() => setShowGroupDrawer(true)} />
                )}
                <Title level={5} style={{ margin: 0 }}>{customerType === "conversations_new" ? "Khách mới" : "Khách cũ"}</Title>
              </Space>
              <Badge count={conversations.filter((c) => c.status.label === "Mới").length} style={{ backgroundColor: "#1677ff" }} />
            </div>
            <Input
              placeholder="Tìm khách hàng..."
              prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
              size="small"
              style={{ marginBottom: 8, borderRadius: 6 }}
            />
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {[
                { key: "all", label: "Tất cả" },
                { key: "zalo", label: "Zalo" },
                { key: "facebook", label: "Facebook" },
                { key: "web", label: "Web" },
                { key: "email", label: "Email" },
              ].map((ch) => (
                <Tag
                  key={ch.key}
                  color={channelFilter === ch.key ? "blue" : undefined}
                  style={{ cursor: "pointer", borderRadius: 12, fontSize: 12, marginBottom: 0 }}
                  onClick={() => setChannelFilter(ch.key)}
                >
                  {ch.label}
                </Tag>
              ))}
            </div>
          </div>

          {/* Inbox Items */}
          <div style={{ flex: 1, overflowY: "auto", padding: "4px 0" }}>
            {filteredConversations.map((conv) => {
              const isActive = conv.id === activeConversation?.id;
              return (
                <div
                  key={conv.id}
                  onClick={() => {
                    onConversationChange(conv.id);
                    if (isMobile) setIsChatVisible(true);
                  }}
                  className="pancake-inbox-item"
                  style={{
                    display: "flex",
                    gap: 10,
                    padding: "12px 16px",
                    cursor: "pointer",
                    background: isActive ? "#e6f7ff" : "transparent",
                    borderLeft: isActive ? "3px solid #1677ff" : "3px solid transparent",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <Badge dot={conv.status.label === "Mới"} offset={[-2, 2]} color="blue">
                      <Avatar size={40} style={{ background: conv.avatarColor, flexShrink: 0, fontSize: 14 }}>
                        {getInitials(conv.name)}
                      </Avatar>
                    </Badge>
                    {conv.isManual ? (
                      <div style={{ position: "absolute", top: -6, left: -4, background: "#faad14", color: "#fff", fontSize: 9, padding: "0 6px", borderRadius: 10, fontWeight: "bold", border: "1.5px solid #fff", zIndex: 2 }}>
                        Manual
                      </div>
                    ) : (
                      <div style={{ position: "absolute", top: -6, left: -4, background: "#1677ff", color: "#fff", fontSize: 9, padding: "0 6px", borderRadius: 10, fontWeight: "bold", border: "1.5px solid #fff", zIndex: 2 }}>
                        AI
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Text strong style={{ fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 130 }}>{conv.name}</Text>
                      <Text type="secondary" style={{ fontSize: 11, flexShrink: 0 }}>{conv.time}</Text>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                      <Tag style={{ fontSize: 10, lineHeight: "16px", padding: "0 4px", borderRadius: 4, marginInlineEnd: 0, background: channelColor[conv.channel] || "#999", color: "#fff", border: "none" }}>{conv.channel}</Tag>
                      <Tag color={conv.status.color} style={{ fontSize: 10, lineHeight: "16px", padding: "0 4px", borderRadius: 4, marginInlineEnd: 0 }}>{conv.status.label}</Tag>
                    </div>
                    <Text type="secondary" style={{ fontSize: 12, display: "block", marginTop: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {conv.message}
                    </Text>
                  </div>
                </div>
              );
            })}
            {filteredConversations.length === 0 && (
              <div style={{ padding: 24, textAlign: "center" }}>
                <Text type="secondary">Không tìm thấy hội thoại</Text>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Column 2: Chat Window ─── */}
      {(!isMobile || isChatVisible) && activeConversation && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", height: panelHeight, minWidth: 0 }}>
          {/* Chat Header */}
          <div style={{ padding: "12px 20px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", flexShrink: 0 }}>
            <Space>
              {isMobile && (
                <Button type="text" icon={<span style={{ fontSize: 18 }}>←</span>} onClick={() => setIsChatVisible(false)} style={{ marginRight: -8, padding: "0 8px" }} />
              )}
              <Avatar size={36} style={{ background: activeConversation?.avatarColor }}>{getInitials(activeConversation?.name || "")}</Avatar>
              <div>
                <Text strong style={{ fontSize: 15 }}>{activeConversation?.name}</Text>
                <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 2 }}>
                  <Tag style={{ fontSize: 10, lineHeight: "16px", padding: "0 6px", borderRadius: 4, background: channelColor[activeConversation?.channel] || "#999", color: "#fff", border: "none", marginInlineEnd: 0 }}>{activeConversation?.channel}</Tag>
                  <Text type="secondary" style={{ fontSize: 12 }}>{activeConversation?.project}</Text>
                </div>
              </div>
            </Space>
            <Space size={isMobile ? 2 : 6}>
              {!isMobile && <Tag color={activeConversation?.status?.color}>{activeConversation?.status?.label}</Tag>}
              <Button size="small" icon={<PhoneOutlined />} onClick={() => onCallConversationLead(activeConversation?.id)} />
              <Button size="small" icon={<PlusOutlined />} onClick={() => onOpenCreateTicketModal(activeConversation?.id)}>{isMobile ? "" : "Ticket"}</Button>
              {!isMobile && <Button size="small" icon={<EyeOutlined />} onClick={() => setShowInfoPanel(!showInfoPanel)}>{showInfoPanel ? "Ẩn" : "Info"}</Button>}
              {isMobile && <Button size="small" icon={<EyeOutlined />} onClick={() => onOpenConversation(activeConversation)} />}
            </Space>
          </div>

          {/* Messages Area */}
          <div className="pancake-chat-area" style={{ flex: 1, overflowY: "auto", padding: "16px 20px", background: "#f5f5f5" }}>
            {/* Date separator */}
            <div style={{ textAlign: "center", margin: "8px 0 16px" }}>
              <Text type="secondary" style={{ fontSize: 11, background: "#e8e8e8", padding: "2px 12px", borderRadius: 12 }}>Hôm nay</Text>
            </div>

            {(activeConversation?.messages || []).map((msg, idx) => {
              const isCustomer = msg.from === "customer";
              return (
                <div key={idx} style={{ display: "flex", justifyContent: isCustomer ? "flex-start" : "flex-end", marginBottom: 12 }}>
                  {isCustomer && (
                    <Avatar size={28} style={{ background: activeConversation.avatarColor, flexShrink: 0, marginRight: 8, marginTop: 4, fontSize: 11 }}>
                      {getInitials(activeConversation.name)}
                    </Avatar>
                  )}
                  <div style={{ maxWidth: isMobile ? "85%" : "70%" }}>
                    <div style={{
                      padding: "10px 14px",
                      borderRadius: isCustomer ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
                      background: isCustomer ? "#fff" : (msg.from === "ai" ? "#e6f7ff" : "#d9f7be"),
                      border: isCustomer ? "1px solid #f0f0f0" : "none",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
                    }}>
                      {!isCustomer && (
                        <div style={{ marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
                          {msg.tag && <Tag color="blue" style={{ fontSize: 10, lineHeight: "16px", padding: "0 4px", borderRadius: 4, marginInlineEnd: 0 }}>{msg.tag}</Tag>}
                          {msg.name && <Text type="secondary" style={{ fontSize: 11 }}>{msg.name}</Text>}
                          {msg.from === "ai" && !msg.tag && <Tag color="cyan" style={{ fontSize: 10, lineHeight: "16px", padding: "0 4px", borderRadius: 4, marginInlineEnd: 0 }}>AI</Tag>}
                        </div>
                      )}
                      <Text style={{ fontSize: 13, lineHeight: 1.6 }}>{msg.text}</Text>
                    </div>
                    <Text type="secondary" style={{ fontSize: 10, display: "block", marginTop: 4, textAlign: isCustomer ? "left" : "right", paddingInline: 4 }}>{msg.time}</Text>
                  </div>
                  {!isCustomer && msg.from === "ai" && (
                    <Avatar size={28} style={{ background: "#0F6E56", flexShrink: 0, marginLeft: 8, marginTop: 4, fontSize: 11 }}>
                      <RobotOutlined />
                    </Avatar>
                  )}
                  {!isCustomer && msg.from === "agent" && (
                    <Avatar size={28} style={{ background: "#52c41a", flexShrink: 0, marginLeft: 8, marginTop: 4, fontSize: 11 }}>
                      {msg.name ? msg.name[0] : "A"}
                    </Avatar>
                  )}
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          {/* Smart Reply Chips */}
          {activeConversation?.smartReplies?.length > 0 && (
            <div style={{ padding: "8px 20px", borderTop: "1px solid #f0f0f0", background: "#fafafa", display: "flex", gap: 8, flexWrap: "nowrap", overflowX: "auto" }} className="pancake-chat-area">
              <RobotOutlined style={{ color: "#0F6E56", marginTop: 4, flexShrink: 0 }} />
              {activeConversation.smartReplies.map((reply, idx) => (
                <Tag
                  key={idx}
                  color="green"
                  style={{ cursor: "pointer", borderRadius: 12, fontSize: 12, maxWidth: isMobile ? 200 : 280, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flexShrink: 0 }}
                  onClick={() => setChatInput(reply)}
                >
                  {reply.length > 50 && isMobile ? reply.slice(0, 30) + "..." : reply.length > 50 ? reply.slice(0, 50) + "..." : reply}
                </Tag>
              ))}
            </div>
          )}

          {/* Chat Input */}
          <div style={{ padding: "12px 20px", borderTop: "1px solid #f0f0f0", background: "#fff", flexShrink: 0 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <Input.TextArea
                placeholder="Nhập tin nhắn phản hồi..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onPressEnter={(e) => { if (!e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                autoSize={{ minRows: 1, maxRows: 3 }}
                style={{ borderRadius: 8, resize: "none" }}
              />
              <Button type="primary" icon={<SendOutlined />} onClick={handleSendMessage} style={{ borderRadius: 8, height: "auto" }}>
                Gửi
              </Button>
            </div>
            {!isMobile && (
              <Space size={6} style={{ marginTop: 8 }}>
                <Button size="small" icon={<UserSwitchOutlined />} onClick={() => onAssignConversationOwner(activeConversation?.id)}>Gắn owner</Button>
                <Button size="small" icon={<CheckCircleOutlined />} onClick={() => onMarkConversationDone(activeConversation?.id)}>Hoàn tất</Button>
                <Button size="small" icon={<EyeOutlined />} onClick={() => onOpenConversation(activeConversation)}>Drawer</Button>
              </Space>
            )}
          </div>
        </div>
      )}

      {/* Drawer for Channel Groups on Mobile/Tablet */}
      <Drawer
        title="Gộp Kênh Chat"
        placement="left"
        onClose={() => setShowGroupDrawer(false)}
        open={showGroupDrawer}
        width={260}
        bodyStyle={{ padding: 0 }}
      >
        {renderChannelGroups()}
      </Drawer>

      {/* ─── Column 3: Customer Info + AI Panel ─── */}
      {isCompactLayout ? (
        <Drawer
          title="Thông tin khách hàng"
          placement="right"
          onClose={() => setShowInfoPanel(false)}
          open={showInfoPanel}
          width={300}
          bodyStyle={{ padding: 0, background: "#fafafa" }}
          maskClosable={true}
        >
          {renderInfoPanelContent()}
        </Drawer>
      ) : (
        showInfoPanel && !isMobile && activeConversation && (
          <div style={{
            width: 300,
            minWidth: 300,
            borderLeft: "1px solid #f0f0f0",
            overflowY: "auto",
            height: panelHeight,
            background: "#fafafa",
          }}>
            {renderInfoPanelContent()}
          </div>
        )
      )}
    </div>
  );
}
