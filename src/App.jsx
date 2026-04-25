import { useEffect, useRef, useState } from "react";
import {
  ApartmentOutlined,
  ArrowRightOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  DashboardOutlined,
  DeploymentUnitOutlined,
  EyeOutlined,
  FileTextOutlined,
  FormOutlined,
  LoadingOutlined,
  MenuOutlined,
  MessageOutlined,
  PlusOutlined,
  PhoneOutlined,
  RobotOutlined,
  SendOutlined,
  SettingOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  ConfigProvider,
  Descriptions,
  Divider,
  Drawer,
  Form,
  Grid,
  Input,
  Layout,
  List,
  Menu,
  Modal,
  Progress,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
  Timeline,
  Typography,
  message,
} from "antd";

const { Header, Sider, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const siderWidth = 220;
const headerHeight = 84;
const footerHeight = 118;
const pageTransitionDuration = 180;

// Sidebar menu groups
const menuItems = [
  {
    type: "group",
    label: "Tổng quan",
    children: [
      { key: "dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
      { key: "conversations", icon: <MessageOutlined />, label: "Hội thoại" },
    ],
  },
  {
    type: "group",
    label: "CSKH / PM",
    children: [
      { key: "tickets", icon: <FileTextOutlined />, label: "Ticket Manager" },
      { key: "classification", icon: <DeploymentUnitOutlined />, label: "Phân loại AI" },
      { key: "mapping", icon: <ApartmentOutlined />, label: "Owner Mapping" },
    ],
  },
  {
    type: "group",
    label: "Marketing",
    children: [
      { key: "reports", icon: <BarChartOutlined />, label: "Báo cáo AI" },
      { key: "content", icon: <FormOutlined />, label: "Content Assist" },
    ],
  },
  {
    type: "group",
    label: "Nội bộ",
    children: [
      { key: "assistant", icon: <RobotOutlined />, label: "Trợ lý AI" },
      { key: "settings", icon: <SettingOutlined />, label: "Cài đặt" },
    ],
  },
];

// Page titles
const pageMeta = {
  dashboard: { title: "Dashboard vận hành", subtitle: "Toàn cảnh vận hành AI Agent đa kênh trong ngày." },
  conversations: { title: "Trung tâm hội thoại", subtitle: "Theo dõi inbox, ưu tiên phản hồi và hành động tiếp theo." },
  tickets: { title: "Ticket Manager", subtitle: "Quản lý ticket theo SLA, owner và mức độ ưu tiên." },
  classification: { title: "Phân loại AI", subtitle: "Giám sát intent, độ chính xác và các case AI cần audit." },
  mapping: { title: "Owner Mapping", subtitle: "Phân tuyến ticket theo nhóm xử lý, tải công việc và rule routing." },
  reports: { title: "Báo cáo AI", subtitle: "Tổng hợp hiệu suất đa kênh, marketing và chuyển đổi lead." },
  content: { title: "Content Assist", subtitle: "Kho nội dung AI hỗ trợ sale, CSKH và marketing bất động sản." },
  assistant: { title: "Trợ lý AI nội bộ", subtitle: "Khai thác dữ liệu vận hành bằng truy vấn ngôn ngữ tự nhiên." },
  settings: { title: "Cài đặt hệ thống", subtitle: "Quản trị agent, kênh tích hợp, quyền và cấu hình phản hồi." },
};

// Mock metrics
const dashboardMetrics = [
  {
    title: "Hội thoại hôm nay",
    value: 142,
    prefix: <MessageOutlined style={{ color: "#0F6E56" }} />,
    suffix: <Tag color="green">↑ 18%</Tag>,
  },
  {
    title: "AI tự xử lý",
    value: 87,
    prefix: <RobotOutlined style={{ color: "#0F6E56" }} />,
    suffix: (
      <Space size={8}>
        <span>%</span>
        <Tag color="green">↑ 5%</Tag>
      </Space>
    ),
  },
  {
    title: "Ticket đang mở",
    value: 34,
    prefix: <FileTextOutlined style={{ color: "#0F6E56" }} />,
    suffix: <Tag color="red">↑ 3</Tag>,
  },
  {
    title: "Thời gian phản hồi",
    value: 1.2,
    precision: 1,
    prefix: <ThunderboltOutlined style={{ color: "#0F6E56" }} />,
    suffix: (
      <Space size={8}>
        <span>s</span>
        <Tag color="green">↓ tốt hơn</Tag>
      </Space>
    ),
  },
];

// Mock recent conversations
const initialConversations = [
  {
    id: 1,
    name: "Nguyễn Thị Lan",
    message: "Căn hộ Vinhomes quận 9 còn không ạ?",
    time: "2 phút",
    status: { label: "Mới", color: "blue" },
    channel: "Zalo",
    project: "Vinhomes Grand Park",
    intent: "Tư vấn sản phẩm",
    aiSummary: "Khách hỏi tồn kho căn hộ và có dấu hiệu là lead mới từ Zalo OA.",
    owner: "Thu Hà",
    phone: "0903 225 118",
    budget: "3.8 - 4.5 tỷ",
    nextStep: "Gửi giỏ hàng căn 2PN còn quỹ và chốt lịch xem nhà mẫu.",
    timeline: [
      "09:02 Khách mở hội thoại từ Zalo OA",
      "09:03 AI nhận diện intent hỏi tồn kho căn hộ",
      "09:04 Đề xuất gửi brochure và bảng giá mới nhất",
    ],
    avatarColor: "#1677ff",
  },
  {
    id: 2,
    name: "Trần Minh Hoàng",
    message: "Cho hỏi tiến độ bàn giao block B?",
    time: "8 phút",
    status: { label: "Gấp", color: "red" },
    channel: "Facebook",
    project: "The Emerald Riverside",
    intent: "Tiến độ bàn giao",
    aiSummary: "Khách đang theo dõi lịch bàn giao, có nguy cơ escalte sang PM dự án.",
    owner: "Minh Tuấn",
    phone: "0937 801 662",
    budget: "Đã đặt cọc",
    nextStep: "Chuyển PM xác nhận timeline mới và phản hồi trong 15 phút.",
    timeline: [
      "08:48 Khách hỏi tiến độ block B qua Facebook",
      "08:49 AI gắn nhãn Gấp do liên quan bàn giao",
      "08:51 Hệ thống đề xuất escalte sang PM dự án",
    ],
    avatarColor: "#722ed1",
  },
  {
    id: 3,
    name: "Phạm Thị Hương",
    message: "Cảm ơn đã tư vấn, tôi sẽ xem xét",
    time: "15 phút",
    status: { label: "Xong", color: "green" },
    channel: "Web",
    project: "Masteri Centre Point",
    intent: "Nuôi dưỡng lead",
    aiSummary: "Lead đã nhận báo giá và tạm dừng quyết định, nên đẩy vào tệp follow-up tuần sau.",
    owner: "AI Auto",
    phone: "0918 114 903",
    budget: "4.2 tỷ",
    nextStep: "Đưa vào workflow chăm sóc sau báo giá trong 7 ngày.",
    timeline: [
      "08:20 AI gửi bảng giá theo mẫu",
      "08:27 Khách phản hồi sẽ xem xét",
      "08:30 Hệ thống gợi ý follow-up tuần sau",
    ],
    avatarColor: "#13c2c2",
  },
  {
    id: 4,
    name: "Lê Văn Dũng",
    message: "Hợp đồng cần bổ sung điều khoản thanh toán",
    time: "22 phút",
    status: { label: "Chờ PM", color: "orange" },
    channel: "Email",
    project: "Lumiere East",
    intent: "Cập nhật hợp đồng",
    aiSummary: "Case cần PM pháp lý kiểm tra phụ lục thanh toán và xác nhận điều khoản bổ sung.",
    owner: "Quang Huy",
    phone: "0987 444 220",
    budget: "Hợp đồng đã ký",
    nextStep: "Chuyển pháp lý kiểm tra điều khoản và gửi bản đỏline trước 16:00.",
    timeline: [
      "08:01 Email vào hộp thư hợp đồng",
      "08:03 AI phân loại nhóm pháp lý",
      "08:06 Chuyển owner Quang Huy theo rule hợp đồng",
    ],
    avatarColor: "#fa8c16",
  },
  {
    id: 5,
    name: "Hoàng Anh Khoa",
    message: "Giá căn góc tầng 18 block C là bao nhiêu?",
    time: "35 phút",
    status: { label: "Mới", color: "blue" },
    channel: "Web",
    project: "Nam Sài Gòn Residence",
    intent: "Hỏi giá bán",
    aiSummary: "Khách hỏi đúng căn cụ thể, nên ưu tiên trả giá và chính sách thanh toán sớm.",
    owner: "AI Auto",
    phone: "0908 776 230",
    budget: "5.2 tỷ",
    nextStep: "Gửi giá căn góc tầng 18 và chính sách chiết khấu trong ngày.",
    timeline: [
      "07:45 Lead vào từ website",
      "07:46 AI xác định nhu cầu hỏi giá căn cụ thể",
      "07:48 Gợi ý gửi bảng giá và CTA đặt lịch tư vấn",
    ],
    avatarColor: "#2f54eb",
  },
];

// Mock ticket table
const initialTicketData = [
  {
    key: "TK-081",
    ticketCode: "#TK-081",
    content: "Khiếu nại chậm bàn giao Block B",
    channel: "Facebook",
    severity: { label: "Gấp", color: "red" },
    owner: "Minh Tuấn",
    status: { text: "Đang lỗi SLA", value: "error" },
    project: "The Emerald Riverside",
    slaDue: "10:30 hôm nay",
    recommendedAction: "Escalate PM dự án và gọi khách xác nhận timeline mới.",
    timeline: [
      "08:48 Ticket tạo tự động từ hội thoại Facebook",
      "08:51 AI gắn nhãn Gấp và đẩy sang Minh Tuấn",
      "09:10 Chưa có phản hồi từ PM dự án",
    ],
  },
  {
    key: "TK-082",
    ticketCode: "#TK-082",
    content: "Yêu cầu đổi căn tầng cao hơn",
    channel: "Zalo",
    severity: { label: "Trung bình", color: "orange" },
    owner: "Thu Hà",
    status: { text: "Đang xử lý", value: "processing" },
    project: "Vinhomes Grand Park",
    slaDue: "14:00 hôm nay",
    recommendedAction: "Gửi giỏ hàng tầng cao và xác nhận chênh giá cho khách.",
    timeline: [
      "09:02 Lead hỏi đổi căn qua Zalo",
      "09:04 AI map sang owner Thu Hà",
      "09:12 Đã gửi xác nhận đang kiểm tra quỹ căn",
    ],
  },
  {
    key: "TK-083",
    ticketCode: "#TK-083",
    content: "Hỏi chính sách thanh toán trả góp",
    channel: "Web",
    severity: { label: "Thấp", color: "blue" },
    owner: "AI Auto",
    status: { text: "Hoàn tất", value: "success" },
    project: "Masteri Centre Point",
    slaDue: "Đã xong",
    recommendedAction: "Đưa lead vào chuỗi follow-up lãi suất ngân hàng.",
    timeline: [
      "07:40 Lead vào website hỏi chính sách trả góp",
      "07:41 AI gửi mẫu tư vấn vay",
      "07:45 Ticket đóng tự động sau khi khách nhận thông tin",
    ],
  },
  {
    key: "TK-084",
    ticketCode: "#TK-084",
    content: "Cập nhật thông tin hợp đồng",
    channel: "Email",
    severity: { label: "Trung bình", color: "orange" },
    owner: "Quang Huy",
    status: { text: "Chờ phản hồi", value: "warning" },
    project: "Lumiere East",
    slaDue: "16:00 hôm nay",
    recommendedAction: "Soát lại phụ lục và gửi bản cập nhật hợp đồng.",
    timeline: [
      "08:01 Email cập nhật hợp đồng được phân loại",
      "08:05 Ticket chuyển pháp lý",
      "09:18 Đang chờ owner xác nhận thay đổi điều khoản",
    ],
  },
  {
    key: "TK-085",
    ticketCode: "#TK-085",
    content: "Tư vấn dự án Nam Sài Gòn",
    channel: "Web",
    severity: { label: "Thấp", color: "blue" },
    owner: "AI Auto",
    status: { text: "Hoàn tất", value: "success" },
    project: "Nam Sài Gòn Residence",
    slaDue: "Đã xong",
    recommendedAction: "Tạo lịch gọi tư vấn dự án trong 24 giờ.",
    timeline: [
      "07:12 Website lead hỏi dự án Nam Sài Gòn",
      "07:13 AI gửi brochure và chính sách bán hàng",
      "07:20 Ticket đóng tự động sau khi khách nhận tài liệu",
    ],
  },
];

// Ticket table columns
const ticketColumns = [
  {
    title: "Mã ticket",
    dataIndex: "ticketCode",
    key: "ticketCode",
    width: 96,
    render: (value) => <Text strong>{value}</Text>,
  },
  {
    title: "Nội dung",
    dataIndex: "content",
    key: "content",
  },
  {
    title: "Kênh",
    dataIndex: "channel",
    key: "channel",
  },
  {
    title: "Mức độ",
    dataIndex: "severity",
    key: "severity",
    render: (severity) => <Tag color={severity.color}>{severity.label}</Tag>,
  },
  {
    title: "Người phụ trách",
    dataIndex: "owner",
    key: "owner",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (status) => <Badge status={status.value} text={status.text} />,
  },
];

// Mock AI classification rows
const initialClassificationData = [
  { key: 1, customer: "Nguyễn Thu Trang", channel: "Zalo", intent: "Hỏi giá căn hộ", confidence: 96, action: "AI Auto", status: "pending", time: "09:02", aiSummary: "Khách hỏi tồn kho căn hộ, AI phân loại là hỏi giá sản phẩm với confidence cao.", suggestedOwner: "Thu Hà", sopUsed: "SOP-SALES-01" },
  { key: 2, customer: "Đỗ Minh Quân", channel: "Facebook", intent: "Tiến độ bàn giao", confidence: 91, action: "Chuyển PM", status: "pending", time: "08:48", aiSummary: "Khách hỏi tiến độ bàn giao block B, có nguy cơ escalate.", suggestedOwner: "Minh Tuấn", sopUsed: "SOP-CS-03" },
  { key: 3, customer: "Bùi Gia Linh", channel: "Email", intent: "Bổ sung hợp đồng", confidence: 88, action: "Chuyển pháp lý", status: "pending", time: "08:01", aiSummary: "Email yêu cầu bổ sung điều khoản thanh toán trong hợp đồng.", suggestedOwner: "Quang Huy", sopUsed: "SOP-LEGAL-02" },
  { key: 4, customer: "Võ Thanh Phong", channel: "Web", intent: "Hỏi vay ngân hàng", confidence: 93, action: "AI Auto", status: "pending", time: "07:40", aiSummary: "Khách hỏi chính sách trả góp và lãi suất ngân hàng.", suggestedOwner: "AI Auto", sopUsed: "SOP-SALES-05" },
  { key: 5, customer: "Trần Thị Mai", channel: "Zalo", intent: "Khiếu nại dịch vụ", confidence: 78, action: "Chuyển CSKH", status: "pending", time: "07:22", aiSummary: "Khách phản ánh chất lượng dịch vụ sau bán hàng, sentiment tiêu cực.", suggestedOwner: "Lan Anh", sopUsed: "SOP-CS-08" },
  { key: 6, customer: "Lê Hoàng Dũng", channel: "Facebook", intent: "Đăng ký tư vấn", confidence: 95, action: "AI Auto", status: "pending", time: "07:15", aiSummary: "Lead mới quan tâm dự án Nam Sài Gòn, yêu cầu tư vấn trực tiếp.", suggestedOwner: "Thu Hà", sopUsed: "SOP-SALES-02" },
];

const intentOptions = [
  "Hỏi giá căn hộ",
  "Tiến độ bàn giao",
  "Bổ sung hợp đồng",
  "Hỏi vay ngân hàng",
  "Khiếu nại dịch vụ",
  "Đăng ký tư vấn",
  "Hoàn tiền",
  "Bảo hành",
  "Khác",
];

// Mock owner mapping rows
const initialOwnerRules = [
  { key: 1, rule: "Lead hỏi giá căn hộ dưới 5 tỷ", team: "Sales sơ cấp", owner: "AI Auto → Thu Hà", sla: "5 phút", active: true },
  { key: 2, rule: "Hỏi tiến độ bàn giao / chậm tiến độ", team: "CSKH / PM", owner: "Minh Tuấn", sla: "10 phút", active: true },
  { key: 3, rule: "Phụ lục hợp đồng / điều khoản thanh toán", team: "Pháp lý", owner: "Quang Huy", sla: "30 phút", active: true },
  { key: 4, rule: "Hỏi chính sách marketing / nguồn lead", team: "Marketing", owner: "Lan Anh", sla: "15 phút", active: true },
];

const teamOptions = ["Sales sơ cấp", "CSKH / PM", "Pháp lý", "Marketing", "Kỹ thuật"];
const ownerOptions = ["Minh Tuấn", "Thu Hà", "Quang Huy", "Lan Anh", "AI Auto", "Ngọc Trâm"];
const slaOptions = ["5 phút", "10 phút", "15 phút", "30 phút", "1 giờ", "4 giờ"];

// Mock report rows
const initialReportRows = [
  { key: 1, campaign: "Lead căn hộ Quận 9", leads: 48, aiRate: 81, conversion: 12.5, channel: "Facebook Ads", budget: "15tr", status: "active", aiInsight: "CPL thấp, AI nurture hiệu quả cao nhất nhóm. Đề xuất tăng ngân sách 20%." },
  { key: 2, campaign: "Shophouse Nam Sài Gòn", leads: 22, aiRate: 76, conversion: 9.2, channel: "Zalo OA", budget: "8tr", status: "active", aiInsight: "Tỷ lệ mở tin nhắn cao (68%), nhưng lead chất lượng thấp hơn FB. Cần lọc audience." },
  { key: 3, campaign: "Remarketing khách cũ", leads: 18, aiRate: 89, conversion: 16.0, channel: "Email", budget: "3tr", status: "active", aiInsight: "Conversion cao nhất. AI gợi ý chạy thêm A/B test tiêu đề email để tối ưu open rate." },
  { key: 4, campaign: "Landing page dự án mới", leads: 35, aiRate: 72, conversion: 8.1, channel: "Google Ads", budget: "22tr", status: "paused", aiInsight: "CPL cao do landing page chưa tối ưu mobile. Cần A/B test CTA." },
  { key: 5, campaign: "Retarget website visitors", leads: 12, aiRate: 91, conversion: 18.5, channel: "Facebook Ads", budget: "5tr", status: "active", aiInsight: "Tệp khách chất lượng cao, AI follow-up tự động đạt 91% response rate." },
];
const reportChannelOptions = ["Facebook Ads", "Zalo OA", "Email", "Google Ads", "TikTok Ads"];

// Mock content assist items
const contentDrafts = [
  {
    key: 1,
    title: "Mẫu trả lời hỏi giá căn góc 2PN",
    tag: "Sales",
    text: "Dạ hiện căn góc 2PN block C đang có mức giá từ 4.9 tỷ, kèm lịch thanh toán giãn trong 8 đợt và hỗ trợ vay lên đến 70%.",
  },
  {
    key: 2,
    title: "Email follow-up sau khi gửi bảng giá",
    tag: "CRM",
    text: "Em gửi lại anh/chị bảng giá cập nhật và chính sách ưu đãi mới nhất của dự án. Nếu thuận tiện, em xin phép hẹn 10 phút để tư vấn đúng căn phù hợp nhu cầu.",
  },
  {
    key: 3,
    title: "Nội dung quảng cáo dự án Nam Sài Gòn",
    tag: "Marketing",
    text: "Không gian sống ven sông, pháp lý rõ ràng, lịch thanh toán nhẹ. Khám phá giỏ hàng căn hộ mới tại Nam Sài Gòn Residence ngay hôm nay.",
  },
  {
    key: 4,
    title: "Tin nhắn chăm lead Zalo OA",
    tag: "Sales",
    text: "Chào anh/chị, dự án hiện đang có chương trình ưu đãi chiết khấu 3% khi thanh toán nhanh. Em gửi anh/chị bảng giá chi tiết nhé?",
  },
  {
    key: 5,
    title: "Script xử lý khiếu nại bàn giao",
    tag: "CSKH",
    text: "Dạ em ghi nhận phản hồi của anh/chị về tiến độ bàn giao. Em sẽ chuyển thông tin đến PM phụ trách và phản hồi trong vòng 2 giờ làm việc.",
  },
];

const contentTagOptions = ["Sales", "CRM", "Marketing", "CSKH"];

// Mock assistant history
const assistantHistory = [
  {
    role: "user",
    title: "Ticket gấp hôm nay",
    text: "Cho tôi danh sách ticket có nguy cơ trễ SLA trong hôm nay.",
  },
  {
    role: "assistant",
    title: "AI tổng hợp",
    text: "Có 3 ticket cần ưu tiên: #TK-081, #TK-082 và case hợp đồng Lumiere East cần phản hồi trước 14:00.",
  },
];

// Quick prompt suggestions
const quickActions = [
  "Ticket gấp hôm nay",
  "Hiệu suất AI tuần này",
  "Báo cáo marketing tháng này",
];

function getInitials(name) {
  return name
    .split(" ")
    .slice(-2)
    .map((part) => part[0])
    .join("");
}

function DashboardPage({
  conversations,
  tickets,
  onOpenConversation,
  onOpenTicket,
  onOpenCreateTicketModal,
  onCreateTicketFromConversation,
  onMarkConversationDone,
  onAssignTicket,
  onResolveTicket,
}) {
  const dashboardTicketColumns = [
    ...ticketColumns,
    {
      title: "Action",
      key: "actions",
      width: 210,
      render: (_, ticket) => (
        <Space wrap size={4}>
          <Button size="small" icon={<EyeOutlined />} onClick={() => onOpenTicket(ticket)}>
            Chi tiết
          </Button>
          <Button size="small" icon={<UserSwitchOutlined />} onClick={() => onAssignTicket(ticket.ticketCode)}>
            Nhận xử lý
          </Button>
          <Button size="small" type="primary" ghost icon={<CheckOutlined />} onClick={() => onResolveTicket(ticket.ticketCode)}>
            Xong
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* Dashboard metrics */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        {dashboardMetrics.map((metric) => (
          <Col xs={24} sm={12} xl={6} key={metric.title}>
            <Card>
              <Statistic
                title={metric.title}
                value={metric.value}
                precision={metric.precision}
                prefix={metric.prefix}
                suffix={metric.suffix}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Dashboard panels */}
      <Row gutter={[16, 16]}>
        <Col xs={24} xl={12}>
          <Card
            title="Hội thoại gần đây"
            extra={
              <Space wrap>
                <Tag color="blue">{conversations.filter((item) => item.status.label === "Mới").length} mới</Tag>
                <Button type="link" icon={<ArrowRightOutlined />}>
                  Xem tất cả
                </Button>
              </Space>
            }
          >
            <List
              itemLayout="horizontal"
              dataSource={conversations}
              renderItem={(item) => (
                <List.Item style={{ paddingBlock: 18 }}>
                  <div
                    style={{
                      display: "flex",
                      gap: 16,
                      width: "100%",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                    }}
                  >
                    <Avatar
                      size={40}
                      style={{
                        background: item.avatarColor,
                        flexShrink: 0,
                      }}
                    >
                      {getInitials(item.name)}
                    </Avatar>

                    <div style={{ flex: 1, minWidth: 240 }}>
                      <Space wrap size={[8, 8]}>
                        <Text strong style={{ fontSize: 16 }}>
                          {item.name}
                        </Text>
                        <Tag>{item.channel}</Tag>
                        <Text type="secondary">{item.project}</Text>
                      </Space>

                      <div style={{ marginTop: 8 }}>
                        <Text style={{ fontSize: 15, lineHeight: 1.55 }}>{item.message}</Text>
                      </div>

                      <div style={{ marginTop: 8 }}>
                        <Text type="secondary" style={{ lineHeight: 1.65 }}>
                          AI đề xuất: {item.nextStep}
                        </Text>
                      </div>

                      <Space wrap size={[8, 8]} style={{ marginTop: 14 }}>
                        <Button
                          type="link"
                          size="small"
                          icon={<EyeOutlined />}
                          style={{ paddingInline: 0 }}
                          onClick={() => onOpenConversation(item)}
                        >
                          Chi tiết
                        </Button>
                        <Button
                          size="small"
                          icon={<PlusOutlined />}
                          onClick={() => onCreateTicketFromConversation(item.id)}
                        >
                          Tạo ticket
                        </Button>
                        <Button
                          size="small"
                          icon={<CheckOutlined />}
                          onClick={() => onMarkConversationDone(item.id)}
                        >
                          Hoàn tất
                        </Button>
                      </Space>
                    </div>

                    <div
                      style={{
                        minWidth: 88,
                        marginLeft: "auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: 8,
                      }}
                    >
                      <Text type="secondary">{item.time}</Text>
                      <Tag color={item.status.color} style={{ marginInlineEnd: 0 }}>
                        {item.status.label}
                      </Tag>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} xl={12}>
          <Card
            title="Ticket đang xử lý"
            extra={
              <Space wrap>
                <Tag color="red">{tickets.filter((item) => item.status.value === "error").length} SLA đỏ</Tag>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => onOpenCreateTicketModal()}>
                  Tạo ticket
                </Button>
              </Space>
            }
          >
            <Table
              columns={dashboardTicketColumns}
              dataSource={tickets}
              pagination={false}
              size="small"
              scroll={{ x: 1040 }}
            />
          </Card>
        </Col>

        <Col xs={24} xl={14}>
          <Card title="Trung tâm hành động" extra={<Tag color="red">{tickets.filter((t) => t.status.value === "error").length + conversations.filter((c) => c.status.label === "Mới").length} cần xử lý</Tag>}>
            <List
              dataSource={[
                {
                  key: "call",
                  title: `${conversations.filter((c) => c.status.label === "Mới").length} hội thoại cần gọi lại trong 15 phút`,
                  note: "Khách hỏi tiến độ bàn giao và thay đổi căn hộ có tín hiệu nóng.",
                  action: "Gọi lại ngay",
                  done: false,
                },
                {
                  key: "escalate",
                  title: `${tickets.filter((t) => t.status.value === "error").length} ticket đỏ SLA đang chờ PM xác nhận`,
                  note: "Case bàn giao block B đang vượt ngưỡng phản hồi tiêu chuẩn.",
                  action: "Escalate PM",
                  done: false,
                },
                {
                  key: "send",
                  title: "3 lead cần gửi bảng giá hôm nay",
                  note: "Các lead website đã hỏi đúng sản phẩm và đang chờ CTA tiếp theo.",
                  action: "Gửi giỏ hàng",
                  done: false,
                },
              ]}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button
                      key={item.action}
                      type="primary"
                      ghost
                      size="small"
                      onClick={() => {
                        if (item.key === "call") {
                          const newConv = conversations.find((c) => c.status.label === "Mới");
                          if (newConv) {
                            onOpenConversation(newConv);
                            message.success("Đang mở hội thoại cần gọi lại...");
                          } else {
                            message.info("Không có hội thoại cần gọi lại.");
                          }
                        } else if (item.key === "escalate") {
                          const redTicket = tickets.find((t) => t.status.value === "error");
                          if (redTicket) {
                            onOpenTicket(redTicket);
                            message.warning("Đang mở ticket SLA đỏ...");
                          } else {
                            message.info("Không có ticket SLA đỏ.");
                          }
                        } else {
                          message.success("Đã tạo nhắc gửi bảng giá cho 3 lead.");
                        }
                      }}
                    >
                      {item.action}
                    </Button>,
                  ]}
                >
                  <List.Item.Meta title={<Text strong>{item.title}</Text>} description={item.note} />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} xl={10}>
          <Card title="Nhịp vận hành hôm nay" extra={<Tag color="green">Live</Tag>}>
            <Space direction="vertical" size={16} style={{ width: "100%" }}>
              <div>
                <Space style={{ width: "100%", justifyContent: "space-between" }}>
                  <Text>Tỷ lệ phản hồi trong 5 phút</Text>
                  <Text strong>{conversations.length > 0 ? Math.round((conversations.filter((c) => c.status.label !== "Mới").length / conversations.length) * 100) : 0}%</Text>
                </Space>
                <Progress percent={conversations.length > 0 ? Math.round((conversations.filter((c) => c.status.label !== "Mới").length / conversations.length) * 100) : 0} strokeColor="#0F6E56" />
              </div>
              <div>
                <Space style={{ width: "100%", justifyContent: "space-between" }}>
                  <Text>Lead được AI tự chăm</Text>
                  <Text strong>74%</Text>
                </Space>
                <Progress percent={74} strokeColor="#1677ff" />
              </div>
              <div>
                <Space style={{ width: "100%", justifyContent: "space-between" }}>
                  <Text>Ticket cần escalate</Text>
                  <Text strong>{tickets.filter((t) => t.status.value === "error").length} case</Text>
                </Space>
                <Progress percent={tickets.length > 0 ? Math.round((tickets.filter((t) => t.status.value === "error").length / tickets.length) * 100) : 0} status="exception" />
              </div>
              <Divider style={{ margin: 0 }} />
              <Space wrap>
                <Button size="small" type="primary" ghost icon={<PhoneOutlined />} onClick={() => { const c = conversations.find((cv) => cv.status.label === "Mới"); if (c) { onOpenConversation(c); } else { message.info("Không có hội thoại mới."); } }}>Gọi lead nóng</Button>
                <Button size="small" icon={<PlusOutlined />} onClick={() => onOpenCreateTicketModal()}>Tạo ticket nhanh</Button>
                <Button size="small" icon={<BarChartOutlined />} onClick={() => message.success("Đã tạo báo cáo nhanh hôm nay.")}>Báo cáo nhanh</Button>
              </Space>
            </Space>
          </Card>
        </Col>
      </Row>
    </>
  );
}

function ConversationsPage({
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
}) {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} xl={9}>
        <Card
          title="Danh sách hội thoại"
          extra={<Select defaultValue="all" options={[{ value: "all", label: "Tất cả kênh" }, { value: "zalo", label: "Zalo" }, { value: "facebook", label: "Facebook" }]} style={{ width: isMobile ? 120 : 140 }} />}
        >
          <List
            itemLayout="horizontal"
            dataSource={conversations}
            renderItem={(item) => (
              <List.Item
                onClick={() => onConversationChange(item.id)}
                style={{
                  cursor: "pointer",
                  paddingInline: 12,
                  paddingBlock: 14,
                  borderRadius: 8,
                  background: activeConversation.id === item.id ? "#f6ffed" : "transparent",
                }}
                actions={[
                  <Button
                    key={`open-${item.id}`}
                    type="link"
                    size="small"
                    icon={<EyeOutlined />}
                    onClick={(event) => {
                      event.stopPropagation();
                      onOpenConversation(item);
                    }}
                  >
                    Mở
                  </Button>,
                  <Button
                    key={`ticket-${item.id}`}
                    size="small"
                    icon={<PlusOutlined />}
                    onClick={(event) => {
                      event.stopPropagation();
                      onOpenCreateTicketModal(item.id);
                    }}
                  >
                    Ticket
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar style={{ background: item.avatarColor }}>{getInitials(item.name)}</Avatar>}
                  title={
                    <Space>
                      <Text strong>{item.name}</Text>
                      <Tag color={item.status.color}>{item.status.label}</Tag>
                    </Space>
                  }
                  description={
                    <Space direction="vertical" size={2}>
                      <Text type="secondary">{item.message}</Text>
                      <Text type="secondary">{item.channel} • {item.time}</Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>

      <Col xs={24} xl={15}>
        <Card
          title={
            <Space>
              <Avatar style={{ background: activeConversation.avatarColor }}>{getInitials(activeConversation.name)}</Avatar>
              <div>
                <div>{activeConversation.name}</div>
                <Text type="secondary">{activeConversation.project}</Text>
              </div>
            </Space>
          }
          extra={
            <Space wrap>
              <Tag>{activeConversation.channel}</Tag>
              <Tag color={activeConversation.status.color}>{activeConversation.status.label}</Tag>
              <Button size="small" icon={<PhoneOutlined />} onClick={() => onCallConversationLead(activeConversation.id)}>
                Gọi khách
              </Button>
              <Button size="small" icon={<PlusOutlined />} onClick={() => onOpenCreateTicketModal(activeConversation.id)}>
                Tạo ticket
              </Button>
            </Space>
          }
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card size="small" title="Tin nhắn gần nhất">
                <Paragraph style={{ marginBottom: 0 }}>{activeConversation.message}</Paragraph>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card size="small" title="AI phân tích">
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Intent">{activeConversation.intent}</Descriptions.Item>
                  <Descriptions.Item label="Dự án">{activeConversation.project}</Descriptions.Item>
                  <Descriptions.Item label="Owner gợi ý">{activeConversation.owner}</Descriptions.Item>
                  <Descriptions.Item label="Số điện thoại">{activeConversation.phone}</Descriptions.Item>
                  <Descriptions.Item label="Ngân sách">{activeConversation.budget}</Descriptions.Item>
                </Descriptions>
                <Divider style={{ margin: "12px 0" }} />
                <Text type="secondary">{activeConversation.aiSummary}</Text>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card size="small" title="Hành động đề xuất">
                <Timeline
                  items={[
                    { color: "green", children: "Phản hồi tự động trong 30 giây đầu" },
                    { color: "blue", children: "Gắn tag intent và dự án liên quan" },
                    { color: "orange", children: "Chuyển owner khi khách yêu cầu tài liệu chi tiết" },
                  ]}
                />
              </Card>
            </Col>
            <Col span={24}>
              <Card size="small" title="Khung phản hồi AI">
                <Paragraph>
                  Dạ em kiểm tra giúp anh/chị ngay. Với nhu cầu liên quan đến <Text strong>{activeConversation.project}</Text>, hệ thống đang ưu tiên cập nhật thông tin mới nhất về giá bán, tiến độ và lịch hẹn tư vấn.
                </Paragraph>
                <Space wrap>
                  <Button type="primary" icon={<SendOutlined />} onClick={() => onSendConversationReply(activeConversation.id)}>
                    Gửi phản hồi
                  </Button>
                  <Button icon={<PlusOutlined />} onClick={() => onOpenCreateTicketModal(activeConversation.id)}>
                    Chuyển ticket
                  </Button>
                  <Button icon={<UserSwitchOutlined />} onClick={() => onAssignConversationOwner(activeConversation.id)}>
                    Gắn owner
                  </Button>
                  <Button icon={<CheckOutlined />} onClick={() => onMarkConversationDone(activeConversation.id)}>
                    Hoàn tất
                  </Button>
                </Space>
              </Card>
            </Col>

            <Col span={24}>
              <Card size="small" title="Action nhanh">
                <Space wrap>
                  <Button icon={<EyeOutlined />} onClick={() => onOpenConversation(activeConversation)}>
                    Mở drawer chi tiết
                  </Button>
                  <Button icon={<PhoneOutlined />} onClick={() => onCallConversationLead(activeConversation.id)}>
                    Tạo nhắc gọi
                  </Button>
                  <Button icon={<UserSwitchOutlined />} onClick={() => onAssignConversationOwner(activeConversation.id)}>
                    Điều phối owner
                  </Button>
                  <Button icon={<SendOutlined />} onClick={() => onSendConversationReply(activeConversation.id)}>
                    Dùng phản hồi AI
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

function TicketsPage({
  tickets,
  activeTicket,
  onSelectTicket,
  onOpenTicket,
  onOpenCreateTicketModal,
  onAssignTicket,
  onResolveTicket,
  onEscalateTicket,
  onRemindTicketOwner,
}) {
  const ticketManagerColumns = [
    ...ticketColumns,
    {
      title: "Action",
      key: "actions",
      width: 260,
      render: (_, ticket) => (
        <Space wrap size={4}>
          <Button size="small" icon={<EyeOutlined />} onClick={() => onOpenTicket(ticket)}>
            Chi tiết
          </Button>
          <Button size="small" icon={<UserSwitchOutlined />} onClick={() => onAssignTicket(ticket.ticketCode)}>
            Nhận xử lý
          </Button>
          <Button size="small" icon={<ArrowRightOutlined />} onClick={() => onEscalateTicket(ticket.ticketCode)}>
            Escalate
          </Button>
          <Button size="small" type="primary" ghost icon={<CheckOutlined />} onClick={() => onResolveTicket(ticket.ticketCode)}>
            Đóng
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="Ticket nguy cơ trễ SLA" value={6} prefix={<ThunderboltOutlined style={{ color: "#faad14" }} />} suffix={<Tag color="orange">Cần theo dõi</Tag>} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="Đang xử lý bởi AI Auto" value={14} prefix={<RobotOutlined style={{ color: "#0F6E56" }} />} suffix={<Tag color="green">Ổn định</Tag>} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="Owner bận nhất hôm nay" value="Minh Tuấn" prefix={<TeamOutlined style={{ color: "#1677ff" }} />} />
          </Card>
        </Col>
      </Row>

      <Card
        title="Bảng ticket theo trạng thái"
        extra={
          <Space>
            <Button>Lọc SLA</Button>
            <Button type="primary" onClick={() => onOpenCreateTicketModal()}>
              + Tạo ticket
            </Button>
          </Space>
        }
      >
        <Table
          columns={ticketManagerColumns}
          dataSource={tickets}
          pagination={false}
          scroll={{ x: 1180 }}
          onRow={(record) => ({
            onClick: () => onSelectTicket(record.ticketCode),
            style: {
              cursor: "pointer",
              background: activeTicket?.ticketCode === record.ticketCode ? "#f6ffed" : "transparent",
            },
          })}
        />
      </Card>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} xl={14}>
          <Card
            title={`Ticket đang chọn ${activeTicket ? activeTicket.ticketCode : ""}`}
            extra={
              activeTicket ? (
                <Space wrap>
                  <Tag>{activeTicket.channel}</Tag>
                  <Tag color={activeTicket.severity.color}>{activeTicket.severity.label}</Tag>
                  <Badge status={activeTicket.status.value} text={activeTicket.status.text} />
                </Space>
              ) : null
            }
          >
            {activeTicket ? (
              <Space direction="vertical" size={16} style={{ width: "100%" }}>
                <Card size="small" title="Thông tin ticket">
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="Nội dung">{activeTicket.content}</Descriptions.Item>
                    <Descriptions.Item label="Dự án">{activeTicket.project}</Descriptions.Item>
                    <Descriptions.Item label="Owner">{activeTicket.owner}</Descriptions.Item>
                    <Descriptions.Item label="SLA due">{activeTicket.slaDue}</Descriptions.Item>
                    <Descriptions.Item label="Đề xuất AI">{activeTicket.recommendedAction}</Descriptions.Item>
                  </Descriptions>
                </Card>

                <Card size="small" title="Timeline xử lý">
                  <Timeline items={activeTicket.timeline.map((entry) => ({ children: entry }))} />
                </Card>
              </Space>
            ) : (
              <Text type="secondary">Chọn một ticket trong bảng để xem chi tiết xử lý.</Text>
            )}
          </Card>
        </Col>

        <Col xs={24} xl={10}>
          <Card title="Action center">
            {activeTicket ? (
              <Space direction="vertical" size={12} style={{ width: "100%" }}>
                <Button type="primary" icon={<UserSwitchOutlined />} block onClick={() => onAssignTicket(activeTicket.ticketCode)}>
                  Nhận xử lý ticket
                </Button>
                <Button icon={<PhoneOutlined />} block onClick={() => onRemindTicketOwner(activeTicket.ticketCode)}>
                  Nhắc owner / gọi khách
                </Button>
                <Button icon={<ArrowRightOutlined />} block onClick={() => onEscalateTicket(activeTicket.ticketCode)}>
                  Escalate PM / pháp lý
                </Button>
                <Button icon={<EyeOutlined />} block onClick={() => onOpenTicket(activeTicket)}>
                  Mở drawer chi tiết
                </Button>
                <Button type="primary" ghost icon={<CheckOutlined />} block onClick={() => onResolveTicket(activeTicket.ticketCode)}>
                  Đóng ticket
                </Button>
              </Space>
            ) : (
              <Text type="secondary">Chưa có ticket được chọn.</Text>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
}

function ClassificationPage() {
  const [items, setItems] = useState(initialClassificationData);
  const [filterStatus, setFilterStatus] = useState("all");
  const [detailDrawer, setDetailDrawer] = useState({ open: false, item: null });
  const [overrideModal, setOverrideModal] = useState({ open: false, item: null });
  const [overrideIntent, setOverrideIntent] = useState("");

  const filteredItems = filterStatus === "all" ? items : items.filter((item) => item.status === filterStatus);
  const approvedCount = items.filter((item) => item.status === "approved").length;
  const rejectedCount = items.filter((item) => item.status === "rejected").length;
  const pendingCount = items.filter((item) => item.status === "pending").length;
  const avgConfidence = items.length > 0 ? Math.round(items.reduce((sum, item) => sum + item.confidence, 0) / items.length) : 0;
  const highConfidencePending = items.filter((item) => item.status === "pending" && item.confidence >= 90);

  const approveItem = (key) => {
    setItems((prev) => prev.map((item) => (item.key === key ? { ...item, status: "approved" } : item)));
    message.success("Đã xác nhận phân loại AI.");
  };

  const rejectItem = (key) => {
    setItems((prev) => prev.map((item) => (item.key === key ? { ...item, status: "rejected" } : item)));
    message.warning("Đã từ chối phân loại, cần audit tay.");
  };

  const resetItem = (key) => {
    setItems((prev) => prev.map((item) => (item.key === key ? { ...item, status: "pending" } : item)));
    message.info("Đã đặt lại trạng thái phân loại.");
  };

  const openOverride = (item) => {
    setOverrideIntent(item.intent);
    setOverrideModal({ open: true, item });
  };

  const submitOverride = () => {
    if (!overrideModal.item) return;
    setItems((prev) =>
      prev.map((item) =>
        item.key === overrideModal.item.key
          ? { ...item, intent: overrideIntent, status: "approved", confidence: 100 }
          : item,
      ),
    );
    setOverrideModal({ open: false, item: null });
    message.success("Đã cập nhật intent và xác nhận phân loại.");
  };

  const bulkApproveHighConfidence = () => {
    if (highConfidencePending.length === 0) {
      message.info("Không có case nào đủ điều kiện duyệt hàng loạt.");
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.status === "pending" && item.confidence >= 90 ? { ...item, status: "approved" } : item,
      ),
    );
    message.success(`Đã xác nhận ${highConfidencePending.length} phân loại có confidence ≥ 90%.`);
  };

  const openDetail = (item) => {
    setDetailDrawer({ open: true, item });
  };

  const statusTagMap = {
    pending: <Tag color="blue">Chờ duyệt</Tag>,
    approved: <Tag color="green">Đã duyệt</Tag>,
    rejected: <Tag color="red">Từ chối</Tag>,
  };

  const columns = [
    { title: "Khách hàng", dataIndex: "customer", key: "customer", render: (value) => <Text strong>{value}</Text> },
    { title: "Kênh", dataIndex: "channel", key: "channel" },
    {
      title: "Intent",
      dataIndex: "intent",
      key: "intent",
      render: (value) => <Tag>{value}</Tag>,
    },
    {
      title: "Confidence",
      dataIndex: "confidence",
      key: "confidence",
      width: 160,
      sorter: (a, b) => a.confidence - b.confidence,
      render: (value) => (
        <Progress
          percent={value}
          size="small"
          strokeColor={value >= 90 ? "#0F6E56" : value >= 75 ? "#faad14" : "#ff4d4f"}
          status="active"
        />
      ),
    },
    { title: "Hành động AI", dataIndex: "action", key: "action" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => statusTagMap[status],
    },
    {
      title: "Action",
      key: "actions",
      width: 280,
      render: (_, record) => (
        <Space wrap size={4}>
          <Button size="small" icon={<EyeOutlined />} onClick={() => openDetail(record)}>
            Chi tiết
          </Button>
          {record.status === "pending" ? (
            <>
              <Button size="small" type="primary" ghost icon={<CheckOutlined />} onClick={() => approveItem(record.key)}>
                Duyệt
              </Button>
              <Button size="small" danger icon={<ArrowRightOutlined />} onClick={() => rejectItem(record.key)}>
                Từ chối
              </Button>
            </>
          ) : (
            <Button size="small" onClick={() => resetItem(record.key)}>
              Đặt lại
            </Button>
          )}
          <Button size="small" icon={<FormOutlined />} onClick={() => openOverride(record)}>
            Sửa intent
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Row gutter={[16, 16]}>
        {/* Stats row */}
        <Col xs={24} sm={12} xl={6}>
          <Card>
            <Statistic title="Tổng case" value={items.length} prefix={<DeploymentUnitOutlined style={{ color: "#0F6E56" }} />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <Card>
            <Statistic title="Đã duyệt" value={approvedCount} prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />} suffix={<Tag color="green">{items.length > 0 ? Math.round((approvedCount / items.length) * 100) : 0}%</Tag>} />
          </Card>
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <Card>
            <Statistic title="Chờ duyệt" value={pendingCount} prefix={<ThunderboltOutlined style={{ color: "#faad14" }} />} suffix={pendingCount > 0 ? <Tag color="orange">Cần xử lý</Tag> : <Tag color="green">Xong</Tag>} />
          </Card>
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <Card>
            <Statistic title="Confidence TB" value={avgConfidence} suffix="%" prefix={<RobotOutlined style={{ color: "#1677ff" }} />} />
          </Card>
        </Col>

        {/* Left: Performance */}
        <Col xs={24} xl={8}>
          <Card title="Hiệu suất phân loại">
            <Space direction="vertical" size={20} style={{ width: "100%" }}>
              <div>
                <Space style={{ width: "100%", justifyContent: "space-between" }}>
                  <Text>Độ chính xác intent</Text>
                  <Text strong>{avgConfidence}%</Text>
                </Space>
                <Progress percent={avgConfidence} strokeColor="#0F6E56" />
              </div>
              <div>
                <Space style={{ width: "100%", justifyContent: "space-between" }}>
                  <Text>Tỷ lệ đã duyệt</Text>
                  <Text strong>{items.length > 0 ? Math.round((approvedCount / items.length) * 100) : 0}%</Text>
                </Space>
                <Progress percent={items.length > 0 ? Math.round((approvedCount / items.length) * 100) : 0} strokeColor="#1677ff" />
              </div>
              <div>
                <Space style={{ width: "100%", justifyContent: "space-between" }}>
                  <Text>Từ chối / cần audit</Text>
                  <Text strong>{rejectedCount} case</Text>
                </Space>
                <Progress percent={items.length > 0 ? Math.round((rejectedCount / items.length) * 100) : 0} status="exception" />
              </div>
            </Space>
            <Divider />
            <Button
              type="primary"
              block
              icon={<CheckCircleOutlined />}
              disabled={highConfidencePending.length === 0}
              onClick={bulkApproveHighConfidence}
            >
              Duyệt hàng loạt ({highConfidencePending.length} case ≥ 90%)
            </Button>
          </Card>
        </Col>

        {/* Right: Table */}
        <Col xs={24} xl={16}>
          <Card
            title="Luồng phân loại gần nhất"
            extra={
              <Space wrap>
                <Select
                  value={filterStatus}
                  onChange={setFilterStatus}
                  style={{ width: 150 }}
                  options={[
                    { value: "all", label: `Tất cả (${items.length})` },
                    { value: "pending", label: `Chờ duyệt (${pendingCount})` },
                    { value: "approved", label: `Đã duyệt (${approvedCount})` },
                    { value: "rejected", label: `Từ chối (${rejectedCount})` },
                  ]}
                />
              </Space>
            }
          >
            <Table
              columns={columns}
              dataSource={filteredItems}
              pagination={false}
              scroll={{ x: 1100 }}
              rowClassName={(record) =>
                record.status === "approved" ? "ant-table-row-approved" : record.status === "rejected" ? "ant-table-row-rejected" : ""
              }
            />
          </Card>
        </Col>

        {/* Bottom: Top intent groups */}
        <Col span={24}>
          <Card title="Top nhóm intent">
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}><Card size="small"><Statistic title="Hỏi giá / giỏ hàng" value={38} suffix="case" /></Card></Col>
              <Col xs={24} md={8}><Card size="small"><Statistic title="Tiến độ / bàn giao" value={19} suffix="case" /></Card></Col>
              <Col xs={24} md={8}><Card size="small"><Statistic title="Hợp đồng / pháp lý" value={14} suffix="case" /></Card></Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Detail Drawer */}
      <Drawer
        title="Chi tiết phân loại AI"
        open={detailDrawer.open}
        onClose={() => setDetailDrawer({ open: false, item: null })}
        width={480}
      >
        {detailDrawer.item ? (
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <Card size="small">
              <Space align="start">
                <Avatar style={{ background: "#0F6E56" }}>{detailDrawer.item.customer.split(" ").slice(-1)[0][0]}</Avatar>
                <div>
                  <Text strong>{detailDrawer.item.customer}</Text>
                  <br />
                  <Text type="secondary">{detailDrawer.item.channel} • {detailDrawer.item.time}</Text>
                  <br />
                  <Space style={{ marginTop: 8 }}>
                    <Tag>{detailDrawer.item.intent}</Tag>
                    {statusTagMap[detailDrawer.item.status]}
                  </Space>
                </div>
              </Space>
            </Card>

            <Card size="small" title="AI phân tích">
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Intent"><Tag color="blue">{detailDrawer.item.intent}</Tag></Descriptions.Item>
                <Descriptions.Item label="Confidence">
                  <Progress percent={detailDrawer.item.confidence} size="small" style={{ width: 120 }} strokeColor={detailDrawer.item.confidence >= 90 ? "#0F6E56" : "#faad14"} />
                </Descriptions.Item>
                <Descriptions.Item label="Hành động">{detailDrawer.item.action}</Descriptions.Item>
                <Descriptions.Item label="Owner gợi ý">{detailDrawer.item.suggestedOwner}</Descriptions.Item>
                <Descriptions.Item label="SOP sử dụng"><Tag color="purple">{detailDrawer.item.sopUsed}</Tag></Descriptions.Item>
              </Descriptions>
              <Divider style={{ margin: "12px 0" }} />
              <Text type="secondary">{detailDrawer.item.aiSummary}</Text>
            </Card>

            <Card size="small" title="Hành động">
              <Space direction="vertical" size={8} style={{ width: "100%" }}>
                {detailDrawer.item.status === "pending" ? (
                  <>
                    <Button type="primary" icon={<CheckOutlined />} block onClick={() => { approveItem(detailDrawer.item.key); setDetailDrawer((prev) => ({ ...prev, item: { ...prev.item, status: "approved" } })); }}>
                      Xác nhận phân loại đúng
                    </Button>
                    <Button danger icon={<ArrowRightOutlined />} block onClick={() => { rejectItem(detailDrawer.item.key); setDetailDrawer((prev) => ({ ...prev, item: { ...prev.item, status: "rejected" } })); }}>
                      Từ chối — cần audit tay
                    </Button>
                  </>
                ) : (
                  <Button block onClick={() => { resetItem(detailDrawer.item.key); setDetailDrawer((prev) => ({ ...prev, item: { ...prev.item, status: "pending" } })); }}>
                    Đặt lại trạng thái chờ duyệt
                  </Button>
                )}
                <Button icon={<FormOutlined />} block onClick={() => { openOverride(detailDrawer.item); setDetailDrawer({ open: false, item: null }); }}>
                  Sửa intent thủ công
                </Button>
                <Button icon={<UserSwitchOutlined />} block onClick={() => message.info(`Đã gắn owner ${detailDrawer.item.suggestedOwner} theo gợi ý AI.`)}>
                  Gắn owner: {detailDrawer.item.suggestedOwner}
                </Button>
              </Space>
            </Card>

            <Card size="small" title="Ngưỡng tham chiếu">
              <Timeline
                items={[
                  { color: "green", children: "≥ 90%: Tự động phản hồi nếu có SOP" },
                  { color: "orange", children: "75–89%: Đề xuất, cần xác nhận" },
                  { color: "red", children: "< 75%: Không tự động, chuyển audit" },
                ]}
              />
            </Card>
          </Space>
        ) : null}
      </Drawer>

      {/* Override Intent Modal */}
      <Modal
        title="Sửa intent phân loại"
        open={overrideModal.open}
        onCancel={() => setOverrideModal({ open: false, item: null })}
        onOk={submitOverride}
        okText="Xác nhận sửa"
        cancelText="Huỷ"
      >
        {overrideModal.item ? (
          <Space direction="vertical" size={12} style={{ width: "100%" }}>
            <div>
              <Text type="secondary">Khách hàng:</Text>
              <br />
              <Text strong>{overrideModal.item.customer}</Text>
            </div>
            <div>
              <Text type="secondary">Intent hiện tại:</Text>
              <br />
              <Tag color="orange">{overrideModal.item.intent}</Tag>
              <Text type="secondary" style={{ marginLeft: 8 }}>Confidence: {overrideModal.item.confidence}%</Text>
            </div>
            <div>
              <Text type="secondary">Chọn intent mới:</Text>
              <Select
                value={overrideIntent}
                onChange={setOverrideIntent}
                style={{ width: "100%", marginTop: 8 }}
                options={intentOptions.map((opt) => ({ value: opt, label: opt }))}
              />
            </div>
          </Space>
        ) : null}
      </Modal>
    </>
  );
}

function MappingPage() {
  const [rules, setRules] = useState(initialOwnerRules);
  const [ruleModal, setRuleModal] = useState({ open: false, editing: null });
  const [ruleForm] = Form.useForm();
  const [ownerWorkload, setOwnerWorkload] = useState([
    { key: "mt", name: "Minh Tuấn", load: 82, tag: "Cao", paused: false },
    { key: "th", name: "Thu Hà", load: 64, tag: "Vừa", paused: false },
    { key: "qh", name: "Quang Huy", load: 58, tag: "Vừa", paused: false },
    { key: "aa", name: "AI Auto", load: 71, tag: "Ổn định", paused: false },
    { key: "la", name: "Lan Anh", load: 45, tag: "Vừa", paused: false },
  ]);

  const openAddRule = () => {
    ruleForm.resetFields();
    setRuleModal({ open: true, editing: null });
  };

  const openEditRule = (record) => {
    ruleForm.setFieldsValue(record);
    setRuleModal({ open: true, editing: record });
  };

  const submitRule = async () => {
    const values = await ruleForm.validateFields();
    if (ruleModal.editing) {
      setRules((prev) => prev.map((r) => (r.key === ruleModal.editing.key ? { ...r, ...values } : r)));
      message.success("Đã cập nhật rule routing.");
    } else {
      const nextKey = rules.length > 0 ? Math.max(...rules.map((r) => r.key)) + 1 : 1;
      setRules((prev) => [...prev, { key: nextKey, ...values, active: true }]);
      message.success("Đã thêm rule routing mới.");
    }
    setRuleModal({ open: false, editing: null });
    ruleForm.resetFields();
  };

  const deleteRule = (key) => {
    setRules((prev) => prev.filter((r) => r.key !== key));
    message.success("Đã xóa rule.");
  };

  const toggleRuleActive = (key) => {
    setRules((prev) => prev.map((r) => (r.key === key ? { ...r, active: !r.active } : r)));
    message.info("Đã cập nhật trạng thái rule.");
  };

  const toggleOwnerPause = (ownerKey) => {
    setOwnerWorkload((prev) => prev.map((o) => (o.key === ownerKey ? { ...o, paused: !o.paused } : o)));
  };

  const redistributeLoad = (fromKey) => {
    setOwnerWorkload((prev) => {
      const from = prev.find((o) => o.key === fromKey);
      if (!from || from.load < 20) return prev;
      const others = prev.filter((o) => o.key !== fromKey && !o.paused);
      if (others.length === 0) return prev;
      const transferred = Math.min(20, from.load);
      const each = Math.round(transferred / others.length);
      return prev.map((o) => {
        if (o.key === fromKey) return { ...o, load: Math.max(o.load - transferred, 0), tag: o.load - transferred <= 50 ? "Vừa" : o.tag };
        if (!o.paused && others.some((other) => other.key === o.key)) return { ...o, load: Math.min(o.load + each, 100), tag: o.load + each >= 80 ? "Cao" : "Vừa" };
        return o;
      });
    });
    message.success("Đã phân bổ lại tải công việc.");
  };

  const ruleColumns = [
    {
      title: "Rule routing",
      dataIndex: "rule",
      key: "rule",
      render: (value, record) => <Text style={{ opacity: record.active ? 1 : 0.45 }}>{value}</Text>,
    },
    { title: "Nhóm xử lý", dataIndex: "team", key: "team" },
    {
      title: "Owner mặc định",
      dataIndex: "owner",
      key: "owner",
      render: (value) => <Tag color="blue">{value}</Tag>,
    },
    { title: "SLA", dataIndex: "sla", key: "sla", width: 90 },
    {
      title: "Trạng thái",
      key: "active",
      width: 100,
      render: (_, record) => (
        <Tag color={record.active ? "green" : "default"}>{record.active ? "Bật" : "Tắt"}</Tag>
      ),
    },
    {
      title: "Action",
      key: "actions",
      width: 220,
      render: (_, record) => (
        <Space wrap size={4}>
          <Button size="small" icon={<FormOutlined />} onClick={() => openEditRule(record)}>Sửa</Button>
          <Button size="small" onClick={() => toggleRuleActive(record.key)}>{record.active ? "Tắt" : "Bật"}</Button>
          <Button size="small" danger onClick={() => deleteRule(record.key)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Row gutter={[16, 16]}>
        {/* Stats */}
        <Col xs={24} sm={8}>
          <Card><Statistic title="Rule đang hoạt động" value={rules.filter((r) => r.active).length} suffix={`/ ${rules.length}`} prefix={<ApartmentOutlined style={{ color: "#0F6E56" }} />} /></Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card><Statistic title="Owner khả dụng" value={ownerWorkload.filter((o) => !o.paused).length} suffix={`/ ${ownerWorkload.length}`} prefix={<TeamOutlined style={{ color: "#1677ff" }} />} /></Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card><Statistic title="Owner quá tải (≥80%)" value={ownerWorkload.filter((o) => o.load >= 80 && !o.paused).length} prefix={<ThunderboltOutlined style={{ color: "#faad14" }} />} suffix={ownerWorkload.filter((o) => o.load >= 80 && !o.paused).length > 0 ? <Tag color="red">Cần điều phối</Tag> : <Tag color="green">Ổn</Tag>} /></Card>
        </Col>

        {/* Rules table */}
        <Col xs={24} xl={16}>
          <Card
            title="Rule owner mapping"
            extra={
              <Button type="primary" icon={<PlusOutlined />} onClick={openAddRule}>
                Thêm rule
              </Button>
            }
          >
            <Table columns={ruleColumns} dataSource={rules} pagination={false} scroll={{ x: 900 }} />
          </Card>
        </Col>

        {/* Workload */}
        <Col xs={24} xl={8}>
          <Card title="Tải công việc owner">
            <List
              dataSource={ownerWorkload}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button
                      key="pause"
                      size="small"
                      type={item.paused ? "primary" : "default"}
                      ghost={item.paused}
                      onClick={() => toggleOwnerPause(item.key)}
                    >
                      {item.paused ? "Bật lại" : "Tạm dừng"}
                    </Button>,
                    item.load >= 60 && !item.paused ? (
                      <Button key="redist" size="small" icon={<UserSwitchOutlined />} onClick={() => redistributeLoad(item.key)}>
                        Phân bổ
                      </Button>
                    ) : null,
                  ].filter(Boolean)}
                >
                  <List.Item.Meta
                    title={
                      <Space>
                        <Text strong style={{ opacity: item.paused ? 0.45 : 1 }}>{item.name}</Text>
                        {item.paused ? <Tag>Tạm dừng</Tag> : <Tag color={item.tag === "Cao" ? "red" : item.tag === "Ổn định" ? "green" : "blue"}>{item.tag}</Tag>}
                      </Space>
                    }
                    description={
                      <Progress
                        percent={item.load}
                        size="small"
                        strokeColor={item.load >= 80 ? "#ff4d4f" : item.load >= 60 ? "#faad14" : "#0F6E56"}
                        status={item.paused ? "exception" : "active"}
                      />
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Add/Edit Rule Modal */}
      <Modal
        title={ruleModal.editing ? "Sửa rule routing" : "Thêm rule routing"}
        open={ruleModal.open}
        onCancel={() => { setRuleModal({ open: false, editing: null }); ruleForm.resetFields(); }}
        onOk={submitRule}
        okText={ruleModal.editing ? "Cập nhật" : "Thêm"}
        cancelText="Huỷ"
        width={560}
        destroyOnHidden
      >
        <Form form={ruleForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item label="Mô tả rule routing" name="rule" rules={[{ required: true, message: "Nhập mô tả rule" }]}>
            <Input placeholder="VD: Lead hỏi giá căn hộ dưới 5 tỷ" />
          </Form.Item>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item label="Nhóm xử lý" name="team" rules={[{ required: true }]}>
                <Select options={teamOptions.map((t) => ({ value: t, label: t }))} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Owner mặc định" name="owner" rules={[{ required: true }]}>
                <Select options={ownerOptions.map((o) => ({ value: o, label: o }))} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="SLA" name="sla" rules={[{ required: true }]}>
            <Select options={slaOptions.map((s) => ({ value: s, label: s }))} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

function ReportsPage() {
  const [campaigns, setCampaigns] = useState(initialReportRows);
  const [filterChannel, setFilterChannel] = useState("all");
  const [detailDrawer, setDetailDrawer] = useState({ open: false, item: null });
  const [campaignModal, setCampaignModal] = useState({ open: false, editing: null });
  const [campaignForm] = Form.useForm();

  const filtered = filterChannel === "all" ? campaigns : campaigns.filter((c) => c.channel === filterChannel);
  const totalLeads = campaigns.reduce((sum, c) => sum + c.leads, 0);
  const avgAiRate = campaigns.length > 0 ? Math.round(campaigns.reduce((sum, c) => sum + c.aiRate, 0) / campaigns.length) : 0;
  const avgConversion = campaigns.length > 0 ? (campaigns.reduce((sum, c) => sum + c.conversion, 0) / campaigns.length).toFixed(1) : 0;
  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;

  const openAdd = () => {
    campaignForm.resetFields();
    setCampaignModal({ open: true, editing: null });
  };

  const openEdit = (record) => {
    campaignForm.setFieldsValue(record);
    setCampaignModal({ open: true, editing: record });
  };

  const submitCampaign = async () => {
    const values = await campaignForm.validateFields();
    if (campaignModal.editing) {
      setCampaigns((prev) => prev.map((c) => (c.key === campaignModal.editing.key ? { ...c, ...values } : c)));
      message.success("Đã cập nhật chiến dịch.");
    } else {
      const nextKey = campaigns.length > 0 ? Math.max(...campaigns.map((c) => c.key)) + 1 : 1;
      setCampaigns((prev) => [...prev, { key: nextKey, ...values, aiRate: 0, conversion: 0, status: "active", aiInsight: "Chiến dịch mới — chưa có dữ liệu AI phân tích." }]);
      message.success("Đã thêm chiến dịch mới.");
    }
    setCampaignModal({ open: false, editing: null });
    campaignForm.resetFields();
  };

  const deleteCampaign = (key) => {
    setCampaigns((prev) => prev.filter((c) => c.key !== key));
    message.success("Đã xóa chiến dịch.");
  };

  const toggleStatus = (key) => {
    setCampaigns((prev) => prev.map((c) => (c.key === key ? { ...c, status: c.status === "active" ? "paused" : "active" } : c)));
    message.info("Đã cập nhật trạng thái.");
  };

  const exportReport = () => {
    message.success(`Đã xuất báo cáo ${filtered.length} chiến dịch.`);
  };

  const columns = [
    { title: "Chiến dịch", dataIndex: "campaign", key: "campaign", render: (v, r) => <Text strong style={{ opacity: r.status === "paused" ? 0.5 : 1 }}>{v}</Text> },
    { title: "Lead mới", dataIndex: "leads", key: "leads", sorter: (a, b) => a.leads - b.leads, render: (v) => <Text strong>{v}</Text> },
    { title: "AI xử lý", dataIndex: "aiRate", key: "aiRate", sorter: (a, b) => a.aiRate - b.aiRate, render: (v) => <Progress percent={v} size="small" strokeColor={v >= 80 ? "#0F6E56" : v >= 60 ? "#faad14" : "#ff4d4f"} style={{ minWidth: 80 }} /> },
    { title: "Chuyển đổi", dataIndex: "conversion", key: "conversion", sorter: (a, b) => a.conversion - b.conversion, render: (v) => <Tag color={v >= 15 ? "green" : v >= 10 ? "blue" : "default"}>{v}%</Tag> },
    { title: "Nguồn", dataIndex: "channel", key: "channel", render: (v) => <Tag>{v}</Tag> },
    { title: "Ngân sách", dataIndex: "budget", key: "budget" },
    { title: "Trạng thái", key: "status", render: (_, r) => <Tag color={r.status === "active" ? "green" : "default"}>{r.status === "active" ? "Đang chạy" : "Tạm dừng"}</Tag> },
    {
      title: "Action",
      key: "actions",
      width: 260,
      render: (_, record) => (
        <Space wrap size={4}>
          <Button size="small" icon={<EyeOutlined />} onClick={() => setDetailDrawer({ open: true, item: record })}>AI Insight</Button>
          <Button size="small" icon={<FormOutlined />} onClick={() => openEdit(record)}>Sửa</Button>
          <Button size="small" onClick={() => toggleStatus(record.key)}>{record.status === "active" ? "Dừng" : "Bật"}</Button>
          <Button size="small" danger onClick={() => deleteCampaign(record.key)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} xl={6}>
          <Card><Statistic title="Tổng lead tháng này" value={totalLeads} prefix={<BarChartOutlined style={{ color: "#0F6E56" }} />} suffix={<Tag color="green">+12%</Tag>} /></Card>
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <Card><Statistic title="AI chăm lead TB" value={avgAiRate} suffix="%" prefix={<RobotOutlined style={{ color: "#722ed1" }} />} /></Card>
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <Card><Statistic title="Conversion TB" value={avgConversion} suffix="%" prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />} /></Card>
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <Card><Statistic title="Chiến dịch đang chạy" value={activeCampaigns} suffix={`/ ${campaigns.length}`} prefix={<ThunderboltOutlined style={{ color: "#faad14" }} />} /></Card>
        </Col>
      </Row>

      <Card
        title="Báo cáo chiến dịch"
        extra={
          <Space wrap>
            <Select value={filterChannel} onChange={setFilterChannel} style={{ width: 160 }} options={[{ value: "all", label: `Tất cả (${campaigns.length})` }, ...reportChannelOptions.map((ch) => ({ value: ch, label: ch }))]} />
            <Button icon={<BarChartOutlined />} onClick={exportReport}>Xuất báo cáo</Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>Thêm chiến dịch</Button>
          </Space>
        }
      >
        <Table columns={columns} dataSource={filtered} pagination={false} scroll={{ x: 1100 }} />
      </Card>

      {/* Detail Drawer */}
      <Drawer title="AI Insight — Chiến dịch" open={detailDrawer.open} onClose={() => setDetailDrawer({ open: false, item: null })} width={440}>
        {detailDrawer.item ? (
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <Card size="small">
              <Text strong style={{ fontSize: 16 }}>{detailDrawer.item.campaign}</Text>
              <br />
              <Space style={{ marginTop: 8 }}>
                <Tag>{detailDrawer.item.channel}</Tag>
                <Tag color={detailDrawer.item.status === "active" ? "green" : "default"}>{detailDrawer.item.status === "active" ? "Đang chạy" : "Tạm dừng"}</Tag>
              </Space>
            </Card>
            <Card size="small" title="Chỉ số">
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Lead mới"><Text strong>{detailDrawer.item.leads}</Text></Descriptions.Item>
                <Descriptions.Item label="AI xử lý"><Progress percent={detailDrawer.item.aiRate} size="small" style={{ width: 120 }} /></Descriptions.Item>
                <Descriptions.Item label="Tỷ lệ chuyển đổi"><Tag color={detailDrawer.item.conversion >= 15 ? "green" : "blue"}>{detailDrawer.item.conversion}%</Tag></Descriptions.Item>
                <Descriptions.Item label="Ngân sách">{detailDrawer.item.budget}</Descriptions.Item>
              </Descriptions>
            </Card>
            <Card size="small" title="AI phân tích & đề xuất">
              <Paragraph>{detailDrawer.item.aiInsight}</Paragraph>
            </Card>
            <Card size="small" title="Hành động">
              <Space direction="vertical" size={8} style={{ width: "100%" }}>
                <Button type="primary" block icon={<BarChartOutlined />} onClick={() => { message.success(`Đã xuất chi tiết chiến dịch "${detailDrawer.item.campaign}".`); }}>Xuất chi tiết</Button>
                <Button block icon={<FormOutlined />} onClick={() => { openEdit(detailDrawer.item); setDetailDrawer({ open: false, item: null }); }}>Sửa chiến dịch</Button>
                <Button block onClick={() => { toggleStatus(detailDrawer.item.key); setDetailDrawer((prev) => ({ ...prev, item: { ...prev.item, status: prev.item.status === "active" ? "paused" : "active" } })); }}>
                  {detailDrawer.item.status === "active" ? "Tạm dừng chiến dịch" : "Kích hoạt lại"}
                </Button>
              </Space>
            </Card>
          </Space>
        ) : null}
      </Drawer>

      {/* Add/Edit Campaign Modal */}
      <Modal
        title={campaignModal.editing ? "Sửa chiến dịch" : "Thêm chiến dịch"}
        open={campaignModal.open}
        onCancel={() => { setCampaignModal({ open: false, editing: null }); campaignForm.resetFields(); }}
        onOk={submitCampaign}
        okText={campaignModal.editing ? "Cập nhật" : "Thêm"}
        cancelText="Huỷ"
        width={520}
        destroyOnHidden
      >
        <Form form={campaignForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item label="Tên chiến dịch" name="campaign" rules={[{ required: true, message: "Nhập tên chiến dịch" }]}>
            <Input placeholder="VD: Lead căn hộ Quận 9" />
          </Form.Item>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item label="Nguồn kênh" name="channel" rules={[{ required: true }]}>
                <Select options={reportChannelOptions.map((ch) => ({ value: ch, label: ch }))} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Ngân sách" name="budget" rules={[{ required: true }]}>
                <Input placeholder="VD: 15tr" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Lead mới" name="leads" rules={[{ required: true }]}>
            <Input type="number" placeholder="Số lead" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

function ContentPage() {
  const [drafts, setDrafts] = useState(contentDrafts);
  const [filterTag, setFilterTag] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [editModal, setEditModal] = useState({ open: false, editing: null });
  const [editForm] = Form.useForm();

  const filtered = drafts.filter((d) => {
    const tagMatch = filterTag === "all" || d.tag === filterTag;
    const searchMatch = !searchText || d.title.toLowerCase().includes(searchText.toLowerCase()) || d.text.toLowerCase().includes(searchText.toLowerCase());
    return tagMatch && searchMatch;
  });

  const tagColor = (tag) => (tag === "Marketing" ? "purple" : tag === "CRM" ? "gold" : tag === "CSKH" ? "cyan" : "green");

  const copyToClipboard = (text, title) => {
    navigator.clipboard.writeText(text).then(() => {
      message.success(`Đã copy mẫu "${title}".`);
    }).catch(() => {
      message.info("Đã chọn mẫu để dùng.");
    });
  };

  const openAdd = () => {
    editForm.resetFields();
    setEditModal({ open: true, editing: null });
  };

  const openEdit = (draft) => {
    editForm.setFieldsValue(draft);
    setEditModal({ open: true, editing: draft });
  };

  const submitDraft = async () => {
    const values = await editForm.validateFields();
    if (editModal.editing) {
      setDrafts((prev) => prev.map((d) => (d.key === editModal.editing.key ? { ...d, ...values } : d)));
      message.success("Đã cập nhật mẫu nội dung.");
    } else {
      const nextKey = drafts.length > 0 ? Math.max(...drafts.map((d) => d.key)) + 1 : 1;
      setDrafts((prev) => [...prev, { key: nextKey, ...values }]);
      message.success("Đã thêm mẫu nội dung mới.");
    }
    setEditModal({ open: false, editing: null });
    editForm.resetFields();
  };

  const deleteDraft = (key) => {
    setDrafts((prev) => prev.filter((d) => d.key !== key));
    message.success("Đã xóa mẫu.");
  };

  const aiRewrite = (key) => {
    setDrafts((prev) => prev.map((d) => {
      if (d.key !== key) return d;
      return { ...d, text: d.text + "\n\n[AI Rewrite] Nội dung đã được tối ưu hóa cho tỷ lệ phản hồi cao hơn, giữ đúng SOP và giọng văn chuyên nghiệp." };
    }));
    message.success("AI đã viết lại nội dung.");
  };

  const tagCounts = {};
  for (const d of drafts) tagCounts[d.tag] = (tagCounts[d.tag] || 0) + 1;

  return (
    <>
      {/* Header actions */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} xl={6}>
          <Card><Statistic title="Tổng mẫu nội dung" value={drafts.length} prefix={<FileTextOutlined style={{ color: "#0F6E56" }} />} /></Card>
        </Col>
        {contentTagOptions.map((tag) => (
          <Col xs={12} sm={6} xl={4} key={tag}>
            <Card size="small">
              <Statistic title={tag} value={tagCounts[tag] || 0} prefix={<Tag color={tagColor(tag)}>{tag[0]}</Tag>} />
            </Card>
          </Col>
        ))}
      </Row>

      <Card
        title="Kho mẫu nội dung"
        extra={
          <Space wrap>
            <Input.Search placeholder="Tìm mẫu..." allowClear value={searchText} onChange={(e) => setSearchText(e.target.value)} style={{ width: 180 }} />
            <Select value={filterTag} onChange={setFilterTag} style={{ width: 130 }} options={[{ value: "all", label: `Tất cả (${drafts.length})` }, ...contentTagOptions.map((t) => ({ value: t, label: `${t} (${tagCounts[t] || 0})` }))]} />
            <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>Thêm mẫu</Button>
          </Space>
        }
      >
        <Row gutter={[16, 16]}>
          {filtered.length === 0 ? (
            <Col span={24}><div style={{ padding: 40, textAlign: "center", color: "#999" }}>Không tìm thấy mẫu nào.</div></Col>
          ) : null}
          {filtered.map((draft) => (
            <Col xs={24} xl={8} key={draft.key}>
              <Card
                title={draft.title}
                extra={<Tag color={tagColor(draft.tag)}>{draft.tag}</Tag>}
                actions={[
                  <Button type="link" key="copy" onClick={() => copyToClipboard(draft.text, draft.title)}>Copy</Button>,
                  <Button type="link" key="ai" onClick={() => aiRewrite(draft.key)}>AI Rewrite</Button>,
                  <Button type="link" key="edit" onClick={() => openEdit(draft)}>Sửa</Button>,
                  <Button type="link" danger key="del" onClick={() => deleteDraft(draft.key)}>Xóa</Button>,
                ]}
              >
                <Paragraph style={{ minHeight: 110, marginBottom: 0 }}>{draft.text}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={editModal.editing ? "Sửa mẫu nội dung" : "Thêm mẫu nội dung"}
        open={editModal.open}
        onCancel={() => { setEditModal({ open: false, editing: null }); editForm.resetFields(); }}
        onOk={submitDraft}
        okText={editModal.editing ? "Cập nhật" : "Thêm"}
        cancelText="Huỷ"
        width={560}
        destroyOnHidden
      >
        <Form form={editForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item label="Tiêu đề" name="title" rules={[{ required: true, message: "Nhập tiêu đề mẫu" }]}>
            <Input placeholder="VD: Mẫu trả lời hỏi giá" />
          </Form.Item>
          <Form.Item label="Phân loại" name="tag" rules={[{ required: true }]}>
            <Select options={contentTagOptions.map((t) => ({ value: t, label: t }))} />
          </Form.Item>
          <Form.Item label="Nội dung mẫu" name="text" rules={[{ required: true, message: "Nhập nội dung" }]}>
            <Input.TextArea rows={5} placeholder="Nhập nội dung mẫu để dùng nhanh..." />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

function AssistantPage() {
  const [messages, setMessages] = useState(assistantHistory);
  const [draft, setDraft] = useState("");
  const chatEndRef = useRef(null);

  const aiResponses = {
    "Ticket gấp hôm nay": "Có 3 ticket cần ưu tiên: #TK-081 (khiếu nại bàn giao, SLA còn 1h), #TK-082 (bổ sung hợp đồng, quá hạn), và case hợp đồng Lumiere East cần phản hồi trước 14:00. Đề xuất: ưu tiên xử lý #TK-082 trước vì đã quá SLA.",
    "Hiệu suất AI tuần này": "Tuần này AI xử lý 142 hội thoại, tự động phản hồi 78% (tăng 5% so với tuần trước). Tỷ lệ handoff: 22%. Intent chính xác: 91%. Có 8 case bị reject cần audit lại rule SOP-CS-03.",
    "Báo cáo marketing tháng này": "Tổng lead: 135 (+12% MoM). Kênh hiệu quả nhất: Facebook Ads (48 lead, CVR 12.5%). Zalo OA có open rate 68% nhưng CVR thấp (9.2%). Đề xuất: tăng budget FB Ads 20%, A/B test Zalo content.",
    "Top owner quá tải hôm nay": "Minh Tuấn đang xử lý 14 ticket (tải 82%), cao nhất nhóm. Đề xuất phân bổ 3-4 ticket sang Thu Hà (tải 64%) hoặc Lan Anh (tải 45%).",
    "Xem dự án được hỏi nhiều nhất": "Top 3 dự án tuần này: 1) Nam Sài Gòn Residence (38 lượt hỏi, chủ yếu giá), 2) Lumiere East (22 lượt, tiến độ bàn giao), 3) The Opus One (15 lượt, chính sách vay).",
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { role: "user", title: text.length > 40 ? text.slice(0, 40) + "..." : text, text };
    const aiResponse = aiResponses[text] || `Đã nhận yêu cầu: "${text}". Tôi đang phân tích dữ liệu nội bộ từ Odoo, ticket system và CRM. Kết quả sẽ được trả về trong vài giây. Lưu ý: tất cả truy vấn đều được ghi audit log.`;
    const aiMsg = { role: "assistant", title: "AI tổng hợp", text: aiResponse };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setDraft("");
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const clearHistory = () => {
    setMessages([]);
    message.success("Đã xóa lịch sử truy vấn.");
  };

  const copyResponse = (text) => {
    navigator.clipboard.writeText(text).then(() => message.success("Đã copy.")).catch(() => message.info("Đã chọn nội dung."));
  };

  const allQuickActions = [...quickActions, "Top owner quá tải hôm nay", "Xem dự án được hỏi nhiều nhất"];

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} xl={15}>
        <Card
          title="Lịch sử truy vấn AI"
          extra={
            <Space>
              <Tag color="blue">{messages.filter((m) => m.role === "user").length} truy vấn</Tag>
              <Button size="small" danger onClick={clearHistory}>Xóa lịch sử</Button>
            </Space>
          }
        >
          <div style={{ maxHeight: 420, overflowY: "auto", marginBottom: 16 }}>
            <List
              dataSource={messages}
              renderItem={(item, index) => (
                <List.Item
                  actions={item.role === "assistant" ? [
                    <Button type="link" size="small" key="copy" onClick={() => copyResponse(item.text)}>Copy</Button>,
                  ] : []}
                >
                  <List.Item.Meta
                    avatar={<Avatar style={{ background: item.role === "assistant" ? "#0F6E56" : "#1677ff" }}>{item.role === "assistant" ? "AI" : "NV"}</Avatar>}
                    title={<Text strong>{item.title}</Text>}
                    description={<Paragraph style={{ marginBottom: 0, whiteSpace: "pre-wrap" }}>{item.text}</Paragraph>}
                  />
                </List.Item>
              )}
            />
            <div ref={chatEndRef} />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Input
              placeholder="Hỏi dữ liệu nội bộ, ticket, lead, owner..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onPressEnter={() => sendMessage(draft)}
              style={{ flex: 1 }}
            />
            <Button type="primary" icon={<SendOutlined />} onClick={() => sendMessage(draft)}>Gửi</Button>
          </div>
        </Card>
      </Col>
      <Col xs={24} xl={9}>
        <Card title="Lệnh nhanh">
          <Space direction="vertical" size={10} style={{ width: "100%" }}>
            {allQuickActions.map((action) => (
              <Button key={action} block onClick={() => sendMessage(action)} icon={<ThunderboltOutlined />}>{action}</Button>
            ))}
          </Space>
        </Card>
        <Card title="Phạm vi truy cập" size="small" style={{ marginTop: 16 }}>
          <Space direction="vertical" size={8}>
            <Tag color="green">Ticket & hội thoại</Tag>
            <Tag color="green">Báo cáo marketing</Tag>
            <Tag color="green">Owner mapping</Tag>
            <Tag color="orange">Odoo — chỉ đọc (Quản lý cấp trung)</Tag>
            <Tag color="red">Dữ liệu tài chính — không khả dụng</Tag>
          </Space>
        </Card>
      </Col>
    </Row>
  );
}

function SettingsPage() {
  const [config, setConfig] = useState({
    channels: ["Zalo OA", "Facebook Page", "Web Chat", "Email"],
    model: "ViProperty Agent v2",
    handoffThreshold: 85,
    slaHours: "08:00 - 21:00",
    autoReply: true,
    auditLog: true,
  });
  const [services, setServices] = useState([
    { key: "zalo", label: "Zalo webhook", status: "success", text: "Ổn định", active: true },
    { key: "fb", label: "Facebook inbox sync", status: "processing", text: "Đồng bộ liên tục", active: true },
    { key: "email", label: "Email parser", status: "success", text: "Ổn định", active: true },
    { key: "routing", label: "Owner routing engine", status: "processing", text: "Đang hoạt động", active: true },
  ]);
  const [editModal, setEditModal] = useState(false);
  const [editForm] = Form.useForm();

  const openEditConfig = () => {
    editForm.setFieldsValue({
      model: config.model,
      handoffThreshold: config.handoffThreshold,
      slaHours: config.slaHours,
    });
    setEditModal(true);
  };

  const saveConfig = async () => {
    const values = await editForm.validateFields();
    setConfig((prev) => ({ ...prev, ...values }));
    setEditModal(false);
    message.success("Đã lưu cấu hình.");
  };

  const toggleService = (key) => {
    setServices((prev) => prev.map((s) => {
      if (s.key !== key) return s;
      const active = !s.active;
      return { ...s, active, status: active ? "success" : "default", text: active ? "Đã kích hoạt" : "Đã tắt" };
    }));
    message.info("Đã cập nhật trạng thái dịch vụ.");
  };

  const testWebhook = (key) => {
    setServices((prev) => prev.map((s) => (s.key === key ? { ...s, status: "processing", text: "Đang test..." } : s)));
    setTimeout(() => {
      setServices((prev) => prev.map((s) => (s.key === key ? { ...s, status: "success", text: "Test OK ✓" } : s)));
      message.success("Webhook phản hồi thành công.");
    }, 1500);
  };

  const toggleAutoReply = () => {
    setConfig((prev) => ({ ...prev, autoReply: !prev.autoReply }));
    message.info(config.autoReply ? "Đã tắt auto-reply." : "Đã bật auto-reply.");
  };

  const toggleAuditLog = () => {
    setConfig((prev) => ({ ...prev, auditLog: !prev.auditLog }));
    message.info(config.auditLog ? "Đã tắt audit log." : "Đã bật audit log.");
  };

  const resetDefaults = () => {
    setConfig({ channels: ["Zalo OA", "Facebook Page", "Web Chat", "Email"], model: "ViProperty Agent v2", handoffThreshold: 85, slaHours: "08:00 - 21:00", autoReply: true, auditLog: true });
    message.success("Đã khôi phục cấu hình mặc định.");
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} xl={12}>
          <Card
            title="Cấu hình hệ thống"
            extra={
              <Space>
                <Button icon={<FormOutlined />} onClick={openEditConfig}>Chỉnh sửa</Button>
                <Button danger onClick={resetDefaults}>Reset mặc định</Button>
              </Space>
            }
          >
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Kênh đang kết nối">
                <Space wrap>{config.channels.map((ch) => <Tag key={ch} color="blue">{ch}</Tag>)}</Space>
              </Descriptions.Item>
              <Descriptions.Item label="Mô hình trả lời"><Tag color="purple">{config.model}</Tag></Descriptions.Item>
              <Descriptions.Item label="Ngưỡng auto handoff">Confidence dưới {config.handoffThreshold}%</Descriptions.Item>
              <Descriptions.Item label="Khung giờ SLA">{config.slaHours}</Descriptions.Item>
              <Descriptions.Item label="Auto-reply">
                <Button size="small" type={config.autoReply ? "primary" : "default"} onClick={toggleAutoReply}>
                  {config.autoReply ? "Đang bật" : "Đang tắt"}
                </Button>
              </Descriptions.Item>
              <Descriptions.Item label="Audit log">
                <Button size="small" type={config.auditLog ? "primary" : "default"} onClick={toggleAuditLog}>
                  {config.auditLog ? "Đang bật" : "Đang tắt"}
                </Button>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col xs={24} xl={12}>
          <Card title="Trạng thái dịch vụ">
            <List
              dataSource={services}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button key="toggle" size="small" type={item.active ? "default" : "primary"} ghost={!item.active} onClick={() => toggleService(item.key)}>
                      {item.active ? "Tắt" : "Bật"}
                    </Button>,
                    item.active ? <Button key="test" size="small" onClick={() => testWebhook(item.key)}>Test</Button> : null,
                  ].filter(Boolean)}
                >
                  <Space style={{ width: "100%", justifyContent: "space-between" }}>
                    <Text style={{ opacity: item.active ? 1 : 0.45 }}>{item.label}</Text>
                    <Badge status={item.active ? item.status : "default"} text={item.text} />
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Edit Config Modal */}
      <Modal
        title="Chỉnh sửa cấu hình"
        open={editModal}
        onCancel={() => setEditModal(false)}
        onOk={saveConfig}
        okText="Lưu"
        cancelText="Huỷ"
        destroyOnHidden
      >
        <Form form={editForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item label="Mô hình AI" name="model">
            <Select options={[
              { value: "ViProperty Agent v2", label: "ViProperty Agent v2" },
              { value: "ViProperty Agent v3 (Beta)", label: "ViProperty Agent v3 (Beta)" },
              { value: "GPT-4o Fine-tuned", label: "GPT-4o Fine-tuned" },
            ]} />
          </Form.Item>
          <Form.Item label="Ngưỡng auto handoff (%)" name="handoffThreshold">
            <Input type="number" min={50} max={100} />
          </Form.Item>
          <Form.Item label="Khung giờ SLA" name="slaHours">
            <Input placeholder="VD: 08:00 - 21:00" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

function renderPageContent(
  selectedKey,
  conversations,
  tickets,
  activeConversation,
  activeTicket,
  onConversationChange,
  isMobile,
  dashboardActions,
) {
  switch (selectedKey) {
    case "dashboard":
      return (
        <DashboardPage
          conversations={conversations}
          tickets={tickets}
          onOpenConversation={dashboardActions.onOpenConversation}
          onOpenTicket={dashboardActions.onOpenTicket}
          onOpenCreateTicketModal={dashboardActions.onOpenCreateTicketModal}
          onCreateTicketFromConversation={dashboardActions.onCreateTicketFromConversation}
          onMarkConversationDone={dashboardActions.onMarkConversationDone}
          onAssignTicket={dashboardActions.onAssignTicket}
          onResolveTicket={dashboardActions.onResolveTicket}
        />
      );
    case "conversations":
      return (
        <ConversationsPage
          conversations={conversations}
          activeConversation={activeConversation}
          onConversationChange={onConversationChange}
          onOpenConversation={dashboardActions.onOpenConversation}
          onOpenCreateTicketModal={dashboardActions.onOpenCreateTicketModal}
          onAssignConversationOwner={dashboardActions.onAssignConversationOwner}
          onSendConversationReply={dashboardActions.onSendConversationReply}
          onCallConversationLead={dashboardActions.onCallConversationLead}
          onMarkConversationDone={dashboardActions.onMarkConversationDone}
          isMobile={isMobile}
        />
      );
    case "tickets":
      return (
        <TicketsPage
          tickets={tickets}
          activeTicket={activeTicket}
          onSelectTicket={dashboardActions.onSelectTicket}
          onOpenTicket={dashboardActions.onOpenTicket}
          onOpenCreateTicketModal={dashboardActions.onOpenCreateTicketModal}
          onAssignTicket={dashboardActions.onAssignTicket}
          onResolveTicket={dashboardActions.onResolveTicket}
          onEscalateTicket={dashboardActions.onEscalateTicket}
          onRemindTicketOwner={dashboardActions.onRemindTicketOwner}
        />
      );
    case "classification":
      return <ClassificationPage />;
    case "mapping":
      return <MappingPage />;
    case "reports":
      return <ReportsPage />;
    case "content":
      return <ContentPage />;
    case "assistant":
      return <AssistantPage />;
    case "settings":
      return <SettingsPage />;
    default:
      return <DashboardPage />;
  }
}

function SidebarContent({ selectedKey, onSelect }) {
  return (
    <>
      <div
        style={{
          margin: 16,
          padding: 14,
          borderRadius: 8,
          background: "rgba(255,255,255,0.08)",
        }}
      >
        <Space align="start" size={12}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "#0F6E56",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              flexShrink: 0,
            }}
          >
            <ApartmentOutlined />
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, lineHeight: 1.2 }}>ViProperty</div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, marginTop: 2 }}>
              AI Agent Platform
            </div>
          </div>
        </Space>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems}
        onClick={({ key }) => onSelect(key)}
        style={{
          background: "transparent",
          borderInlineEnd: 0,
          flex: 1,
        }}
      />

      <div style={{ padding: "12px 16px 20px" }}>
        <Badge
          status="processing"
          text={<span style={{ color: "rgba(255,255,255,0.75)" }}>AI Agent đang hoạt động</span>}
        />
      </div>
    </>
  );
}

function DashboardDetailDrawer({
  detailState,
  onClose,
  onOpenCreateTicketModal,
  onCreateTicketFromConversation,
  onMarkConversationDone,
  onAssignTicket,
  onResolveTicket,
  isMobile,
}) {
  const isConversation = detailState.type === "conversation";
  const item = detailState.item;

  return (
    <Drawer
      title={isConversation ? "Chi tiết hội thoại" : "Chi tiết ticket"}
      placement="right"
      open={detailState.open}
      onClose={onClose}
      width={isMobile ? "100%" : 460}
      extra={
        isConversation ? (
          <Space wrap>
            <Button size="small" icon={<PlusOutlined />} onClick={() => onOpenCreateTicketModal(item.id)}>
              Tạo ticket
            </Button>
            <Button size="small" type="primary" icon={<CheckOutlined />} onClick={() => onMarkConversationDone(item.id)}>
              Hoàn tất
            </Button>
          </Space>
        ) : (
          <Space wrap>
            <Button size="small" icon={<UserSwitchOutlined />} onClick={() => onAssignTicket(item.ticketCode)}>
              Nhận xử lý
            </Button>
            <Button size="small" type="primary" icon={<CheckOutlined />} onClick={() => onResolveTicket(item.ticketCode)}>
              Đóng ticket
            </Button>
          </Space>
        )
      }
    >
      {isConversation ? (
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
          <Card size="small">
            <Space align="start">
              <Avatar style={{ background: item.avatarColor, flexShrink: 0 }}>{getInitials(item.name)}</Avatar>
              <div>
                <Text strong>{item.name}</Text>
                <br />
                <Text type="secondary">{item.phone} • {item.channel}</Text>
                <br />
                <Tag style={{ marginTop: 8 }}>{item.project}</Tag>
                <Tag color={item.status.color}>{item.status.label}</Tag>
              </div>
            </Space>
          </Card>

          <Card size="small" title="Thông tin lead">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Intent">{item.intent}</Descriptions.Item>
              <Descriptions.Item label="Owner gợi ý">{item.owner}</Descriptions.Item>
              <Descriptions.Item label="Ngân sách">{item.budget}</Descriptions.Item>
              <Descriptions.Item label="Bước tiếp theo">{item.nextStep}</Descriptions.Item>
            </Descriptions>
          </Card>

          <Card size="small" title="Nội dung trao đổi">
            <Paragraph>{item.message}</Paragraph>
            <Text type="secondary">AI summary: {item.aiSummary}</Text>
          </Card>

          <Card size="small" title="Hành động nhanh">
            <Space wrap>
              <Button type="primary" icon={<PhoneOutlined />}>Gọi khách</Button>
              <Button icon={<SendOutlined />}>Gửi báo giá</Button>
              <Button icon={<UserSwitchOutlined />}>Gắn owner</Button>
            </Space>
          </Card>

          <Card size="small" title="Timeline xử lý">
            <Timeline items={item.timeline.map((entry) => ({ children: entry }))} />
          </Card>
        </Space>
      ) : (
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
          <Card size="small">
            <Space direction="vertical" size={8} style={{ width: "100%" }}>
              <Space style={{ justifyContent: "space-between", width: "100%" }}>
                <Text strong>{item.ticketCode}</Text>
                <Tag color={item.severity.color}>{item.severity.label}</Tag>
              </Space>
              <Text>{item.content}</Text>
              <Space wrap>
                <Tag>{item.channel}</Tag>
                <Tag>{item.project}</Tag>
                <Badge status={item.status.value} text={item.status.text} />
              </Space>
            </Space>
          </Card>

          <Card size="small" title="Thông tin xử lý">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Owner hiện tại">{item.owner}</Descriptions.Item>
              <Descriptions.Item label="SLA due">{item.slaDue}</Descriptions.Item>
              <Descriptions.Item label="Đề xuất AI">{item.recommendedAction}</Descriptions.Item>
            </Descriptions>
          </Card>

          <Card size="small" title="Hành động nhanh">
            <Space wrap>
              <Button type="primary" icon={<UserSwitchOutlined />}>Điều phối owner</Button>
              <Button icon={<PhoneOutlined />}>Gọi khách</Button>
              <Button icon={<ArrowRightOutlined />}>Escalate PM</Button>
            </Space>
          </Card>

          <Card size="small" title="Timeline ticket">
            <Timeline items={item.timeline.map((entry) => ({ children: entry }))} />
          </Card>
        </Space>
      )}
    </Drawer>
  );
}

export default function App() {
  const screens = useBreakpoint();
  const isDesktop = Boolean(screens.lg);
  const isTablet = Boolean(screens.md) && !screens.lg;
  const isMobile = !screens.md;
  const currentHeaderHeight = isMobile ? 128 : isTablet ? 104 : headerHeight;
  const currentFooterHeight = isDesktop ? footerHeight : 0;

  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [displayedKey, setDisplayedKey] = useState("dashboard");
  const [pageVisible, setPageVisible] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [conversationItems, setConversationItems] = useState(initialConversations);
  const [ticketItems, setTicketItems] = useState(initialTicketData);
  const [selectedConversationId, setSelectedConversationId] = useState(initialConversations[1]?.id ?? initialConversations[0]?.id);
  const [selectedTicketCode, setSelectedTicketCode] = useState(initialTicketData[0]?.ticketCode ?? null);
  const [detailState, setDetailState] = useState({ open: false, type: "conversation", item: initialConversations[0] });
  const [ticketModalState, setTicketModalState] = useState({ open: false, sourceConversationId: null });
  const contentScrollRef = useRef(null);
  const [ticketForm] = Form.useForm();
  const activeConversation = conversationItems.find((item) => item.id === selectedConversationId) ?? conversationItems[0];
  const activeTicket = ticketItems.find((item) => item.ticketCode === selectedTicketCode) ?? ticketItems[0] ?? null;

  useEffect(() => {
    if (selectedKey === displayedKey) return undefined;

    setPageVisible(false);

    const switchTimer = window.setTimeout(() => {
      setDisplayedKey(selectedKey);
      setPageVisible(true);
    }, pageTransitionDuration);

    return () => window.clearTimeout(switchTimer);
  }, [displayedKey, selectedKey]);

  useEffect(() => {
    if (isDesktop) {
      contentScrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [displayedKey, isDesktop]);

  useEffect(() => {
    if (isDesktop && navOpen) {
      setNavOpen(false);
    }
  }, [isDesktop, navOpen]);

  const handleMenuSelect = (key) => {
    if (key !== selectedKey) {
      setSelectedKey(key);
    }

    if (!isDesktop) {
      setNavOpen(false);
    }
  };

  const openConversationDetail = (conversation) => {
    setDetailState({ open: true, type: "conversation", item: conversation });
  };

  const openTicketDetail = (ticket) => {
    setSelectedTicketCode(ticket.ticketCode);
    setDetailState({ open: true, type: "ticket", item: ticket });
  };

  const closeDetailDrawer = () => {
    setDetailState((current) => ({ ...current, open: false }));
  };

  const syncConversationDetailState = (conversationId, updates) => {
    setDetailState((current) =>
      current.type === "conversation" && current.item?.id === conversationId
        ? {
            ...current,
            item: {
              ...current.item,
              ...updates,
            },
          }
        : current,
    );
  };

  const openCreateTicketModal = (conversationId = null) => {
    const sourceConversation = conversationItems.find((item) => item.id === conversationId);

    setTicketModalState({ open: true, sourceConversationId: conversationId });
    ticketForm.setFieldsValue({
      content: sourceConversation?.message ?? "",
      channel: sourceConversation?.channel ?? "Zalo",
      severity: sourceConversation?.status.label === "Gấp" ? "Gấp" : "Trung bình",
      owner: sourceConversation?.owner ?? "AI Auto",
      project: sourceConversation?.project ?? "",
      slaDue: sourceConversation ? "Trong 30 phút" : "Hôm nay 17:00",
      recommendedAction: sourceConversation?.nextStep ?? "",
    });
  };

  const closeCreateTicketModal = () => {
    setTicketModalState({ open: false, sourceConversationId: null });
    ticketForm.resetFields();
  };

  const syncTicketDetailState = (ticketCode, updates, appendTimeline) => {
    setDetailState((current) =>
      current.type === "ticket" && current.item?.ticketCode === ticketCode
        ? {
            ...current,
            item: {
              ...current.item,
              ...updates,
              timeline: appendTimeline ? [...current.item.timeline, appendTimeline] : updates.timeline ?? current.item.timeline,
            },
          }
        : current,
    );
  };

  const markConversationDone = (conversationId) => {
    setConversationItems((current) =>
      current.map((item) =>
        item.id === conversationId
          ? {
              ...item,
              status: { label: "Xong", color: "green" },
              nextStep: "Đã hoàn tất xử lý và đưa vào danh sách follow-up phù hợp.",
            }
          : item,
      ),
    );
    syncConversationDetailState(conversationId, {
      status: { label: "Xong", color: "green" },
      nextStep: "Đã hoàn tất xử lý và đưa vào danh sách follow-up phù hợp.",
    });
    message.success("Đã hoàn tất hội thoại.");
  };

  const assignConversationOwner = (conversationId) => {
    const nextOwner = "Ngọc Trâm";

    setConversationItems((current) =>
      current.map((item) =>
        item.id === conversationId
          ? {
              ...item,
              owner: nextOwner,
              status: { label: "Chờ PM", color: "orange" },
              nextStep: `Đã gắn owner ${nextOwner} và chờ tiếp nhận xử lý.`,
            }
          : item,
      ),
    );
    syncConversationDetailState(conversationId, {
      owner: nextOwner,
      status: { label: "Chờ PM", color: "orange" },
      nextStep: `Đã gắn owner ${nextOwner} và chờ tiếp nhận xử lý.`,
    });
    message.success(`Đã gắn owner ${nextOwner}.`);
  };

  const sendConversationReply = (conversationId) => {
    setConversationItems((current) =>
      current.map((item) =>
        item.id === conversationId
          ? {
              ...item,
              status: { label: "Chờ PM", color: "orange" },
              nextStep: "Đã gửi phản hồi AI và đang chờ khách xác nhận thông tin tiếp theo.",
            }
          : item,
      ),
    );
    syncConversationDetailState(conversationId, {
      status: { label: "Chờ PM", color: "orange" },
      nextStep: "Đã gửi phản hồi AI và đang chờ khách xác nhận thông tin tiếp theo.",
    });
    message.success("Đã gửi phản hồi AI cho hội thoại.");
  };

  const callConversationLead = (conversationId) => {
    const targetConversation = conversationItems.find((item) => item.id === conversationId);
    if (!targetConversation) return;

    syncConversationDetailState(conversationId, {
      nextStep: `Đã tạo nhắc gọi khách ${targetConversation.phone} trong 10 phút tới.`,
    });
    message.success(`Đã tạo nhắc gọi cho ${targetConversation.name}.`);
  };

  const createTicketFromConversation = (conversationId) => {
    const sourceConversation = conversationItems.find((item) => item.id === conversationId);
    if (!sourceConversation) return;

    const existingTicket = ticketItems.find((item) => item.content === sourceConversation.message);
    if (existingTicket) {
      message.info("Hội thoại này đã có ticket, đang mở chi tiết ticket.");
      openTicketDetail(existingTicket);
      return;
    }

    openCreateTicketModal(conversationId);
  };

  const submitCreateTicket = async () => {
    const values = await ticketForm.validateFields();
    const numericTicketCodes = ticketItems
      .map((item) => Number(item.ticketCode.replace("#TK-", "")))
      .filter((value) => !Number.isNaN(value));
    const nextTicketNumber = (numericTicketCodes.length ? Math.max(...numericTicketCodes) : 80) + 1;
    const severityColor = values.severity === "Gấp" ? "red" : values.severity === "Thấp" ? "blue" : "orange";

    const newTicket = {
      key: `TK-${nextTicketNumber}`,
      ticketCode: `#TK-${String(nextTicketNumber).padStart(3, "0")}`,
      content: values.content,
      channel: values.channel,
      severity: { label: values.severity, color: severityColor },
      owner: values.owner,
      status: { text: "Đang xử lý", value: "processing" },
      project: values.project,
      slaDue: values.slaDue,
      recommendedAction: values.recommendedAction,
      timeline: [
        `Ticket được tạo thủ công từ dashboard`,
        `Owner mặc định: ${values.owner}`,
        "Chờ xác nhận hành động tiếp theo",
      ],
    };

    setTicketItems((current) => [newTicket, ...current]);
    setSelectedTicketCode(newTicket.ticketCode);

    if (ticketModalState.sourceConversationId) {
      setConversationItems((current) =>
        current.map((item) =>
          item.id === ticketModalState.sourceConversationId
            ? {
                ...item,
                status: { label: "Chờ PM", color: "orange" },
                nextStep: "Đã tạo ticket và chờ owner tiếp nhận.",
              }
            : item,
        ),
      );
    }

    closeCreateTicketModal();
    setDetailState({ open: true, type: "ticket", item: newTicket });
    message.success(`Đã tạo ticket ${newTicket.ticketCode}`);
  };

  const assignTicket = (ticketCode) => {
    const nextOwner = "Ngọc Trâm";
    setTicketItems((current) =>
      current.map((item) =>
        item.ticketCode === ticketCode
          ? {
              ...item,
              owner: nextOwner,
              status: { text: "Đã nhận xử lý", value: "processing" },
              timeline: [...item.timeline, `Ticket được điều phối sang ${nextOwner}`],
            }
          : item,
      ),
    );
    syncTicketDetailState(ticketCode, { owner: nextOwner, status: { text: "Đã nhận xử lý", value: "processing" } }, `Ticket được điều phối sang ${nextOwner}`);
    message.success(`Đã gán ticket cho ${nextOwner}.`);
  };

  const resolveTicket = (ticketCode) => {
    setTicketItems((current) =>
      current.map((item) =>
        item.ticketCode === ticketCode
          ? {
              ...item,
              status: { text: "Đã xử lý", value: "success" },
              timeline: [...item.timeline, "Ticket được đóng bởi đội vận hành"],
            }
          : item,
      ),
    );
    syncTicketDetailState(ticketCode, { status: { text: "Đã xử lý", value: "success" } }, "Ticket được đóng bởi đội vận hành");
    message.success(`Đã đóng ${ticketCode}.`);
  };

  const escalateTicket = (ticketCode) => {
    setTicketItems((current) =>
      current.map((item) =>
        item.ticketCode === ticketCode
          ? {
              ...item,
              status: { text: "Đã escalte", value: "warning" },
              recommendedAction: "Đã escalte sang PM / pháp lý để xử lý ưu tiên.",
              timeline: [...item.timeline, "Ticket được escalte sang đầu mối xử lý cấp cao hơn"],
            }
          : item,
      ),
    );
    syncTicketDetailState(
      ticketCode,
      {
        status: { text: "Đã escalte", value: "warning" },
        recommendedAction: "Đã escalte sang PM / pháp lý để xử lý ưu tiên.",
      },
      "Ticket được escalte sang đầu mối xử lý cấp cao hơn",
    );
    message.success(`Đã escalte ${ticketCode}.`);
  };

  const remindTicketOwner = (ticketCode) => {
    const targetTicket = ticketItems.find((item) => item.ticketCode === ticketCode);
    if (!targetTicket) return;

    setTicketItems((current) =>
      current.map((item) =>
        item.ticketCode === ticketCode
          ? {
              ...item,
              timeline: [...item.timeline, `Đã gửi nhắc việc tới owner ${item.owner}`],
            }
          : item,
      ),
    );
    syncTicketDetailState(ticketCode, {}, `Đã gửi nhắc việc tới owner ${targetTicket.owner}`);
    message.success(`Đã nhắc ${targetTicket.owner} xử lý ticket.`);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0F6E56",
          borderRadius: 8,
          colorBgLayout: "#f5f5f5",
        },
      }}
    >
      <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
        {isDesktop ? (
          <Sider
            width={siderWidth}
            theme="dark"
            collapsible={false}
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              bottom: 0,
              background: "#001529",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <SidebarContent selectedKey={selectedKey} onSelect={handleMenuSelect} />
          </Sider>
        ) : (
          <Drawer
            title={null}
            placement="left"
            open={navOpen}
            onClose={() => setNavOpen(false)}
            width={isMobile ? 288 : 320}
            closable={false}
            bodyStyle={{
              padding: 0,
              background: "#001529",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <SidebarContent selectedKey={selectedKey} onSelect={handleMenuSelect} />
          </Drawer>
        )}

        <Layout style={{ marginLeft: isDesktop ? siderWidth : 0, background: "#f5f5f5" }}>
          <Header
            style={{
              position: isDesktop ? "fixed" : "sticky",
              top: 0,
              right: 0,
              left: isDesktop ? siderWidth : 0,
              minHeight: currentHeaderHeight,
              height: isDesktop ? currentHeaderHeight : "auto",
              padding: isMobile ? "12px 16px" : "12px 20px",
              background: "#fff",
              borderBottom: "1px solid #f0f0f0",
              display: "flex",
              alignItems: isMobile ? "flex-start" : "center",
              justifyContent: "space-between",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? 12 : 16,
              zIndex: 100,
            }}
          >
            <Space align="start" size={12} style={{ width: isMobile ? "100%" : "auto" }}>
              {!isDesktop ? <Button icon={<MenuOutlined />} onClick={() => setNavOpen(true)} /> : null}
              <div>
                <Title level={5} style={{ margin: 0, lineHeight: 1.2 }}>
                  {pageMeta[displayedKey].title}
                </Title>
                <Text
                  type="secondary"
                  style={{
                    display: "block",
                    marginTop: 4,
                    lineHeight: 1.3,
                    fontSize: isMobile ? 13 : 14,
                  }}
                >
                  {pageMeta[displayedKey].subtitle}
                </Text>
              </div>
            </Space>

            <Space size={[8, 8]} wrap style={{ width: isMobile ? "100%" : "auto" }}>
              {!isMobile ? <Tag color="blue">Zalo</Tag> : null}
              <Tag color="purple">Facebook</Tag>
              <Tag color="orange">Email</Tag>
              <Tag color="green">Web</Tag>
              <Badge color="#52c41a" text="Live" />
              <Avatar style={{ background: "#0F6E56" }}>NT</Avatar>
            </Space>
          </Header>

          <Content
            ref={contentScrollRef}
            style={{
              marginTop: currentHeaderHeight,
              marginBottom: currentFooterHeight,
              padding: isMobile ? 12 : isTablet ? 16 : 24,
              height: isDesktop ? `calc(100vh - ${currentHeaderHeight}px - ${currentFooterHeight}px)` : "auto",
              minHeight: isDesktop ? undefined : `calc(100vh - ${currentHeaderHeight}px)`,
              overflowY: isDesktop ? "auto" : "visible",
              background: "#f5f5f5",
            }}
          >
            <div
              style={{
                opacity: pageVisible ? 1 : 0,
                transform: pageVisible ? "translateY(0px)" : "translateY(10px)",
                filter: pageVisible ? "blur(0px)" : "blur(2px)",
                transition: `opacity ${pageTransitionDuration}ms ease, transform ${pageTransitionDuration}ms ease, filter ${pageTransitionDuration}ms ease`,
                willChange: "opacity, transform, filter",
                pointerEvents: pageVisible ? "auto" : "none",
              }}
            >
              {renderPageContent(
                displayedKey,
                conversationItems,
                ticketItems,
                activeConversation,
                activeTicket,
                setSelectedConversationId,
                isMobile,
                {
                  onOpenConversation: openConversationDetail,
                  onOpenTicket: openTicketDetail,
                  onSelectTicket: setSelectedTicketCode,
                  onOpenCreateTicketModal: openCreateTicketModal,
                  onCreateTicketFromConversation: createTicketFromConversation,
                  onAssignConversationOwner: assignConversationOwner,
                  onSendConversationReply: sendConversationReply,
                  onCallConversationLead: callConversationLead,
                  onMarkConversationDone: markConversationDone,
                  onAssignTicket: assignTicket,
                  onResolveTicket: resolveTicket,
                  onEscalateTicket: escalateTicket,
                  onRemindTicketOwner: remindTicketOwner,
                },
              )}
            </div>
          </Content>

          <Footer
            style={{
              position: isDesktop ? "fixed" : "sticky",
              right: 0,
              bottom: 0,
              left: isDesktop ? siderWidth : 0,
              height: isDesktop ? footerHeight : "auto",
              padding: isMobile ? "12px 12px calc(12px + env(safe-area-inset-bottom))" : "12px 20px",
              background: "#fff",
              borderTop: "1px solid #f0f0f0",
              zIndex: 90,
            }}
          >
            <Space style={{ marginBottom: 8, color: "rgba(0,0,0,0.45)" }} size={8}>
              <LoadingOutlined />
              <Text type="secondary">AI Agent đang xử lý hội thoại...</Text>
            </Space>

            <div style={{ marginBottom: 10 }}>
              <Space size={[8, 8]} wrap>
                {quickActions.map((action) => (
                  <Button key={action} size="small">
                    {action}
                  </Button>
                ))}
              </Space>
            </div>

            <Input.Search
              allowClear
              placeholder="Hỏi trợ lý AI nội bộ..."
              enterButton={
                <Button type="primary" icon={<SendOutlined />}>
                  Gửi
                </Button>
              }
            />
          </Footer>
        </Layout>

        <DashboardDetailDrawer
          detailState={detailState}
          onClose={closeDetailDrawer}
          onOpenCreateTicketModal={openCreateTicketModal}
          onCreateTicketFromConversation={createTicketFromConversation}
          onMarkConversationDone={markConversationDone}
          onAssignTicket={assignTicket}
          onResolveTicket={resolveTicket}
          isMobile={isMobile}
        />

        <Modal
          title={ticketModalState.sourceConversationId ? "Tạo ticket từ hội thoại" : "Tạo ticket mới"}
          open={ticketModalState.open}
          onCancel={closeCreateTicketModal}
          onOk={submitCreateTicket}
          okText="Tạo ticket"
          cancelText="Huỷ"
          width={isMobile ? "100%" : 640}
          destroyOnHidden
        >
          <Form form={ticketForm} layout="vertical">
            <Row gutter={12}>
              <Col xs={24} md={14}>
                <Form.Item
                  label="Nội dung ticket"
                  name="content"
                  rules={[{ required: true, message: "Nhập nội dung ticket" }]}
                >
                  <Input.TextArea rows={3} placeholder="Mô tả ngắn vấn đề cần xử lý..." />
                </Form.Item>
              </Col>
              <Col xs={24} md={10}>
                <Form.Item
                  label="Dự án"
                  name="project"
                  rules={[{ required: true, message: "Nhập tên dự án" }]}
                >
                  <Input placeholder="Ví dụ: Vinhomes Grand Park" />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="Kênh" name="channel" rules={[{ required: true }]}>
                  <Select
                    options={[
                      { value: "Zalo", label: "Zalo" },
                      { value: "Facebook", label: "Facebook" },
                      { value: "Email", label: "Email" },
                      { value: "Web", label: "Web" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="Mức độ" name="severity" rules={[{ required: true }]}>
                  <Select
                    options={[
                      { value: "Gấp", label: "Gấp" },
                      { value: "Trung bình", label: "Trung bình" },
                      { value: "Thấp", label: "Thấp" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="Owner" name="owner" rules={[{ required: true }]}>
                  <Select
                    options={[
                      { value: "Minh Tuấn", label: "Minh Tuấn" },
                      { value: "Thu Hà", label: "Thu Hà" },
                      { value: "Quang Huy", label: "Quang Huy" },
                      { value: "AI Auto", label: "AI Auto" },
                      { value: "Ngọc Trâm", label: "Ngọc Trâm" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="SLA due" name="slaDue" rules={[{ required: true, message: "Nhập deadline SLA" }]}>
                  <Input placeholder="Ví dụ: 14:00 hôm nay" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Đề xuất AI" name="recommendedAction" rules={[{ required: true, message: "Nhập đề xuất xử lý" }]}>
                  <Input placeholder="Ví dụ: Escalate PM và gọi khách" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </Layout>
    </ConfigProvider>
  );
}
