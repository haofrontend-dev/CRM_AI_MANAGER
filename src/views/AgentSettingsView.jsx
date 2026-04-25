import React, { useState } from "react";
import {
  Typography,
  Button,
  Space,
  Tabs,
  Collapse,
  Switch,
  Radio,
  Input,
  Avatar,
  List,
  Tag,
  Divider,
  Card,
  Select,
} from "antd";
import {
  ArrowLeftOutlined,
  ShareAltOutlined,
  TeamOutlined,
  PlayCircleOutlined,
  SettingOutlined,
  FileTextOutlined,
  BookOutlined,
  SyncOutlined,
  SendOutlined,
  RobotOutlined,
  EditOutlined,
  ClearOutlined,
  ExportOutlined,
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const MOCK_CONFIG_FILES = [
  { id: "agents", name: "AGENTS.md", desc: "Cấu hình agent cốt lõi — định nghĩa danh tính, quy tắc hành vi và mẫu phản hồi." },
  { id: "identity", name: "IDENTITY.md", desc: "Danh tính và bối cảnh của người agent — xác định vai trò, nền tảng và chuyên môn trong lĩnh vực." },
  { id: "souls", name: "SOULS.md", desc: "Tính cách và giọng điệu agent — định nghĩa giọng điệu, mức độ đồng cảm và phong cách giao tiếp." },
  { id: "tools", name: "TOOLS.md", desc: "Các công cụ và khả năng có sẵn — xác định agent có thể truy cập gì, cách sử dụng công cụ và các giới hạn thực thi." },
  { id: "user", name: "USER.md", desc: "Hồ sơ người dùng và sở thích — xác định đối tượng mục tiêu, mục tiêu, sở thích giao tiếp và ngữ cảnh tương tác." },
];

const MOCK_SKILLS = [
  { id: "kb1", name: "kb-du-an-eco-green-saigon", desc: "Kiến thức tổng quan về dự án Eco Green Saigon: địa chỉ, vị trí, tiện ích nội khu..." },
  { id: "standby", name: "chuyen-nhan-vien-standby", desc: "Kích hoạt khi nhân viên muốn chuyển khách cho nhân viên khác." },
  { id: "chaohoi", name: "chao-hoi-lock-ngon-ngu", desc: "Xử lý tin nhắn đầu tiên của khách hàng trong phiên, hoặc khi khách nói xin chào." },
  { id: "chuyennhuong", name: "chuyen-nhuong-hop-dong-thue", desc: "Kích hoạt khi KH đang thuê căn hộ tại Eco Green Saigon và muốn chuyển nhượng HĐ thuê." },
  { id: "thuongluong", name: "thuong-luong-gia", desc: "Kích hoạt khi KH yêu cầu giảm giá, đề nghị ưu đãi, so sánh giá..." },
  { id: "guihinh", name: "gui-hinh-anh-video", desc: "Kích hoạt khi KH yêu cầu xem hình/làm/video của căn hộ." },
  { id: "kygui", name: "ky-gui-can-ho", desc: "Kích hoạt khi chủ nhà muốn ký gửi căn hộ tại Eco Green Saigon cho thuê hoặc bán." },
];

const MOCK_TOOLS = [
  { id: "send_lead", name: "Gửi thông tin lead", desc: "Gửi thông tin khách hàng tiềm năng vào kênh Telegram", date: "19-11-2025", active: true },
  { id: "get_leasing", name: "Lấy ds căn hộ cho thuê", desc: "Tìm kiếm các căn hộ cho thuê, trạng thái: trống", date: "21-04-2026", active: true },
  { id: "get_resales", name: "Lấy ds căn hộ chuyển nhượng", desc: "Tìm kiếm các căn hộ đang bán lại", date: "21-04-2026", active: true },
  { id: "get_on_leasing", name: "Lấy ds căn hộ đang thuê", desc: "Tìm kiếm căn hộ cho thuê, trạng thái: đang có khách thuê", date: "21-04-2026", active: true },
  { id: "create_lead", name: "Tạo lead trên DWH", desc: "Khi khách hàng cung cấp tên & SĐT, gọi hàm này để lưu lead vào hệ thống DWH", date: "20-11-2025", active: true },
  { id: "get_property", name: "Lấy thông tin sản phẩm", desc: "Lấy chi tiết thông tin sản phẩm", date: "03-10-2025", active: true },
  { id: "search_property", name: "Tìm kiếm sản phẩm", desc: "Tìm kiếm sản phẩm", date: null, active: false },
];

const MOCK_CHANNELS = [
  { id: "fb_a", name: "Fanpage ViProperty", type: "Facebook" },
  { id: "fb_b", name: "Fanpage Chi nhánh B", type: "Facebook" },
  { id: "zalo_a", name: "Zalo OA Hội Sở", type: "Zalo" },
  { id: "zalo_b", name: "Zalo OA Chi nhánh B", type: "Zalo" },
  { id: "web_main", name: "Website Chính", type: "Web" },
];

const INITIAL_GROUPS = [
  { id: "brand_a", name: "Hội sở chính (Brand A)", channels: ["fb_a", "zalo_a", "web_main"] },
  { id: "brand_b", name: "Chi nhánh B (Brand B)", channels: ["fb_b", "zalo_b"] },
];

export default function AgentSettingsView({ isMobile }) {
  const [activeTab, setActiveTab] = useState("training");
  const [toolsAccess, setToolsAccess] = useState("specific");
  const [toolsState, setToolsState] = useState(MOCK_TOOLS);
  const [channelGroups, setChannelGroups] = useState(INITIAL_GROUPS);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  const toggleTool = (id) => {
    setToolsState((prev) =>
      prev.map((t) => (t.id === id ? { ...t, active: !t.active } : t))
    );
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const newMessage = { text: chatInput, isUser: true };
    setChatMessages([...chatMessages, newMessage]);
    setChatInput("");

    // Mock AI response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { text: "Đây là phản hồi tự động từ Anna V2 khi bạn đang ở chế độ xem trước.", isUser: false }
      ]);
    }, 800);
  };

  const renderTrainingTab = () => (
    <div style={{ padding: "0 16px 24px" }}>
      <Collapse
        defaultActiveKey={["config", "skills"]}
        expandIconPosition="end"
        ghost
        style={{
          background: "#fff",
          borderRadius: 8,
          border: "1px solid #f0f0f0",
        }}
      >
        <Collapse.Panel
          key="basic"
          header={
            <Space size={12}>
              <SettingOutlined style={{ fontSize: 16, color: "#8c8c8c" }} />
              <div>
                <div style={{ fontWeight: 600 }}>Cài đặt cơ bản cho agent</div>
                <div style={{ fontSize: 12, color: "#8c8c8c", fontWeight: 400 }}>Cấu hình tên agent và lựa chọn mô hình</div>
              </div>
            </Space>
          }
        >
          <div style={{ padding: "0 28px" }}>
            <Text type="secondary">Cấu hình cơ bản (Tên, Avatar, Mô hình AI) đang được thiết lập ở màn hình chính.</Text>
          </div>
        </Collapse.Panel>

        <Collapse.Panel
          key="config"
          header={
            <Space size={12}>
              <FileTextOutlined style={{ fontSize: 16, color: "#1677ff" }} />
              <div>
                <div style={{ fontWeight: 600 }}>Các tệp cấu hình của agent</div>
                <div style={{ fontSize: 12, color: "#8c8c8c", fontWeight: 400 }}>Các tệp cấu hình cốt lõi xác định hành vi và tính cách của agent.</div>
              </div>
            </Space>
          }
        >
          <List
            itemLayout="horizontal"
            dataSource={MOCK_CONFIG_FILES}
            style={{ padding: "0 12px" }}
            renderItem={(item) => (
              <List.Item
                style={{ padding: "12px", border: "1px solid #f0f0f0", borderRadius: 8, marginBottom: 8 }}
                actions={[<Button key="edit" type="text" icon={<EditOutlined />} />]}
              >
                <List.Item.Meta
                  avatar={
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: "#f9f0ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <FileTextOutlined style={{ color: "#9254de" }} />
                    </div>
                  }
                  title={<span style={{ fontWeight: 600 }}>{item.name}</span>}
                  description={<span style={{ fontSize: 12 }}>{item.desc}</span>}
                />
              </List.Item>
            )}
          />
        </Collapse.Panel>

        <Collapse.Panel
          key="skills"
          header={
            <Space size={12}>
              <BookOutlined style={{ fontSize: 16, color: "#1677ff" }} />
              <div>
                <div style={{ fontWeight: 600 }}>Kỹ năng</div>
                <div style={{ fontSize: 12, color: "#8c8c8c", fontWeight: 400 }}>Các tệp kỹ năng mô-đun xác định các chức năng và khả năng cụ thể</div>
              </div>
            </Space>
          }
        >
          <List
            itemLayout="horizontal"
            dataSource={MOCK_SKILLS}
            style={{ padding: "0 12px" }}
            renderItem={(item) => (
              <List.Item
                style={{ padding: "12px", border: "1px solid #f0f0f0", borderRadius: 8, marginBottom: 8 }}
                actions={[<Button key="edit" type="text" icon={<EditOutlined />} />]}
              >
                <List.Item.Meta
                  avatar={
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: "#f9f0ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <BookOutlined style={{ color: "#9254de" }} />
                    </div>
                  }
                  title={<span style={{ fontWeight: 600 }}>{item.name}</span>}
                  description={<span style={{ fontSize: 12 }}>{item.desc}</span>}
                />
              </List.Item>
            )}
          />
        </Collapse.Panel>

        <Collapse.Panel
          key="tracking"
          header={
            <Space size={12}>
              <SyncOutlined style={{ fontSize: 16, color: "#8c8c8c" }} />
              <div>
                <div style={{ fontWeight: 600 }}>Theo dõi</div>
                <div style={{ fontSize: 12, color: "#8c8c8c", fontWeight: 400 }}>Nhắc nhở khách hàng và xử lý hội thoại bỏ dở.</div>
              </div>
            </Space>
          }
        />
      </Collapse>
    </div>
  );

  const renderToolsTab = () => (
    <div style={{ padding: "16px 24px 24px" }}>
      <Title level={5} style={{ marginBottom: 4 }}>Quyền Truy Cập Công Cụ</Title>
      <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>Chọn các công cụ mà agent này có thể sử dụng</Text>
      
      <Radio.Group onChange={(e) => setToolsAccess(e.target.value)} value={toolsAccess} style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
        <Radio value="all">
          <div style={{ display: "inline-block", marginLeft: 8 }}>
            <div style={{ fontWeight: 500 }}>Truy cập tất cả công cụ</div>
            <div style={{ fontSize: 12, color: "#8c8c8c" }}>Agent sẽ có quyền truy cập vào tất cả công cụ hiện có</div>
          </div>
        </Radio>
        <Radio value="specific">
          <div style={{ display: "inline-block", marginLeft: 8 }}>
            <div style={{ fontWeight: 500 }}>Truy cập các công cụ cụ thể</div>
            <div style={{ fontSize: 12, color: "#8c8c8c" }}>Agent sẽ chỉ có quyền truy cập vào các công cụ được chọn dưới đây</div>
          </div>
        </Radio>
      </Radio.Group>

      {toolsAccess === "specific" && (
        <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 16 }}>
          <List
            dataSource={toolsState}
            renderItem={(item) => (
              <List.Item
                style={{ borderBottom: "1px solid #f0f0f0", padding: "16px 0" }}
                actions={[
                  <Switch key="toggle" checked={item.active} onChange={() => toggleTool(item.id)} />
                ]}
              >
                <List.Item.Meta
                  title={<span style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</span>}
                  description={
                    <div>
                      <div style={{ marginBottom: 4, color: "#595959" }}>{item.desc}</div>
                      {item.active ? (
                        <Space size={4}>
                          <Text style={{ color: "#52c41a", fontSize: 12 }}>Đang hoạt động</Text>
                          {item.date && (
                            <>
                              <FileTextOutlined style={{ fontSize: 12, color: "#8c8c8c", marginLeft: 8 }} />
                              <Text type="secondary" style={{ fontSize: 12 }}>{item.date}</Text>
                            </>
                          )}
                        </Space>
                      ) : (
                        <Text type="secondary" style={{ fontSize: 12 }}>Chưa kích hoạt</Text>
                      )}
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );

  const renderIntegrationsTab = () => (
    <div style={{ padding: "24px" }}>
      <Title level={5} style={{ marginBottom: 4 }}>Nhóm Kênh Giao Tiếp (Channel Groups)</Title>
      <Text type="secondary" style={{ display: "block", marginBottom: 24 }}>Cấu hình tự động gán luồng cho khách hàng dựa trên kênh liên hệ (Source Filter).</Text>
      
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {channelGroups.map(group => (
          <Card 
            key={group.id} 
            size="small" 
            title={<span style={{ fontWeight: 600 }}>{group.name}</span>} 
            extra={<Button type="text" size="small" icon={<EditOutlined />} />}
            style={{ border: "1px solid #f0f0f0", borderRadius: 8 }}
          >
            <div style={{ marginBottom: 8 }}>
              <Text type="secondary" style={{ fontSize: 13 }}>Các kênh (Fanpage, Zalo, Web) thuộc nhóm này:</Text>
            </div>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Chọn kênh để đưa vào nhóm..."
              value={group.channels}
              onChange={(val) => {
                setChannelGroups(prev => prev.map(g => g.id === group.id ? { ...g, channels: val } : g));
              }}
              options={MOCK_CHANNELS.map(ch => ({ label: `[${ch.type}] ${ch.name}`, value: ch.id }))}
              optionRender={(option) => (
                <Space>
                  <Tag color={option.data.label.includes("Facebook") ? "blue" : option.data.label.includes("Zalo") ? "geekblue" : "cyan"}>
                    {option.data.label.split(']')[0].replace('[', '')}
                  </Tag>
                  {option.data.label.split('] ')[1]}
                </Space>
              )}
            />
          </Card>
        ))}
        <Button type="dashed" block icon={<PlusOutlined />} style={{ height: 40, borderRadius: 8 }}>
          Tạo nhóm kênh mới
        </Button>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#fff", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "16px 24px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <Space align="start" size={16}>
          <Button type="text" icon={<ArrowLeftOutlined />} />
          <div>
            <Title level={5} style={{ margin: 0 }}>Chỉnh sửa Anna V2</Title>
            <Text type="secondary" style={{ fontSize: 13 }}>Tạo và quản lý các AI Agent cho các kênh và trường hợp sử dụng khác nhau.</Text>
          </div>
        </Space>
        <Space>
          <Button icon={<ShareAltOutlined />}>Chia sẻ</Button>
          <Button type="primary" style={{ background: "#9254de" }} icon={<TeamOutlined />}>Cowork</Button>
          <Button icon={<PlayCircleOutlined />}>Xem trước</Button>
        </Space>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left Pane - Main Content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto" }}>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            style={{ padding: "0 24px" }}
            items={[
              { key: "training", label: "Huấn luyện" },
              { key: "knowledge", label: "Kiến thức" },
              { key: "tools", label: "Công cụ" },
              { key: "integrations", label: "Tích hợp kênh" },
              { key: "feedback", label: "Phản hồi" },
              { key: "evaluation", label: "Đánh giá" },
            ]}
          />
          <div style={{ flex: 1, overflowY: "auto", background: "#fafafa" }}>
            {activeTab === "training" && renderTrainingTab()}
            {activeTab === "tools" && renderToolsTab()}
            {activeTab === "integrations" && renderIntegrationsTab()}
            {["knowledge", "feedback", "evaluation"].includes(activeTab) && (
              <div style={{ padding: 40, textAlign: "center", color: "#8c8c8c" }}>
                Chưa có cấu hình cho phần này.
              </div>
            )}
          </div>
          
          {/* Footer Save Button */}
          <div style={{ padding: "16px 24px", borderTop: "1px solid #f0f0f0", display: "flex", justifyContent: "flex-end", gap: 12, background: "#fff" }}>
            <Button>Bỏ qua</Button>
            <Button type="primary">Lưu</Button>
          </div>
        </div>

        {/* Right Pane - Chat Preview */}
        {!isMobile && (
          <div style={{ width: 360, borderLeft: "1px solid #f0f0f0", display: "flex", flexDirection: "column", background: "#fafafa" }}>
            {/* Preview Header */}
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff" }}>
              <Space>
                <Text strong style={{ fontSize: 13 }}>Xem trước</Text>
                <Tag color="blue" style={{ borderRadius: 12, margin: 0, fontSize: 11 }}>AI Anna V2</Tag>
              </Space>
              <Space size={4}>
                <Button type="text" size="small" icon={<ClearOutlined />} />
                <Button type="text" size="small" icon={<ExportOutlined />} />
                <Button type="text" size="small" icon={<CloseOutlined />} />
              </Space>
            </div>

            {/* Chat History Area */}
            <div style={{ flex: 1, padding: 16, overflowY: "auto", display: "flex", flexDirection: "column" }}>
              {chatMessages.length === 0 ? (
                <div style={{ margin: "auto", textAlign: "center" }}>
                  <div style={{ background: "#f0f0f0", width: 64, height: 64, borderRadius: "50%", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <RobotOutlined style={{ fontSize: 24, color: "#bfbfbf" }} />
                  </div>
                  <Text type="secondary" style={{ fontSize: 13 }}>Gửi một tin nhắn để bắt đầu một cuộc trò chuyện mô phỏng.</Text>
                </div>
              ) : (
                <Space direction="vertical" size={16} style={{ width: "100%" }}>
                  {chatMessages.map((msg, index) => (
                    <div key={index} style={{ display: "flex", justifyContent: msg.isUser ? "flex-end" : "flex-start" }}>
                      {!msg.isUser && (
                        <Avatar icon={<RobotOutlined />} style={{ background: "#9254de", marginRight: 8, flexShrink: 0 }} />
                      )}
                      <div style={{
                        maxWidth: "75%",
                        padding: "10px 14px",
                        borderRadius: 16,
                        borderTopLeftRadius: msg.isUser ? 16 : 4,
                        borderTopRightRadius: msg.isUser ? 4 : 16,
                        background: msg.isUser ? "#1677ff" : "#fff",
                        color: msg.isUser ? "#fff" : "inherit",
                        border: msg.isUser ? "none" : "1px solid #e8e8e8",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.03)"
                      }}>
                        <Text style={{ color: "inherit" }}>{msg.text}</Text>
                      </div>
                    </div>
                  ))}
                </Space>
              )}
            </div>

            {/* Input Area */}
            <div style={{ padding: 16, background: "#fff", borderTop: "1px solid #f0f0f0" }}>
              <Input
                placeholder="Nhập tin nhắn để kiểm tra AI Agent của bạn"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onPressEnter={handleSendMessage}
                suffix={
                  <Button 
                    type="text" 
                    icon={<SendOutlined style={{ color: chatInput.trim() ? "#1677ff" : "#bfbfbf" }} />} 
                    onClick={handleSendMessage} 
                    disabled={!chatInput.trim()}
                  />
                }
                style={{ borderRadius: 20 }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
