export const navigation = [
  {
    group: "Vận hành",
    items: [
      { id: "overview", path: "/overview", label: "Tổng quan", hint: "KPI & tình trạng hệ thống" },
      { id: "workflow", path: "/workflow", label: "Workflow AI Agent", hint: "Router, SOP, ticket flow" },
      { id: "conversations", path: "/conversations", label: "Live Chat & AI Copilot", hint: "Inbox, chat, gợi ý AI" },
      { id: "tickets", path: "/tickets", label: "Ticketing & AI Audit", hint: "Ticket + log quyết định" },
    ],
  },
  {
    group: "AI mở rộng",
    items: [
      { id: "marketing", path: "/marketing", label: "Marketing AI Assistant", hint: "Campaign & content" },
      { id: "internal", path: "/internal", label: "Internal AI Assistant", hint: "Chat nội bộ phân quyền" },
    ],
  },
];

export const metricCards = [
  {
    label: "Tổng hội thoại đa kênh",
    value: "18,420",
    delta: "+12.6%",
    note: "Zalo, Facebook, Web, Email",
  },
  {
    label: "AI phân loại tự động thành công",
    value: "92.4%",
    delta: "+3.1%",
    note: "Dựa trên 8,420 hội thoại đã audit",
  },
  {
    label: "Ticket đang mở",
    value: "126",
    delta: "-8.1%",
    note: "52 ticket cần ưu tiên SLA",
  },
  {
    label: "Thời gian phản hồi trung bình",
    value: "01m 48s",
    delta: "-22s",
    note: "Kết hợp AI và nhân sự",
  },
];

export const messageTrafficByChannel = [
  { channel: "Zalo", messages: 7420, color: "from-cyan-400 to-blue-500" },
  { channel: "Facebook", messages: 6120, color: "from-sky-400 to-indigo-500" },
  { channel: "Web", messages: 4880, color: "from-emerald-400 to-teal-500" },
];

export const ticketStatusChart = [
  { label: "Open", value: 126, color: "#f59e0b" },
  { label: "In-progress", value: 214, color: "#06b6d4" },
  { label: "Resolved", value: 944, color: "#10b981" },
];

export const conversations = [
  {
    id: "cv-01",
    customer: "Nguyen Minh Anh",
    avatar: "MA",
    channel: "Facebook",
    topic: "Khiếu nại giao hàng chậm",
    preview: "Đơn #A1921 vẫn chưa nhận được, khách muốn hoàn tiền.",
    time: "2 phút trước",
    priority: "Cao",
    sentiment: "Bức xúc",
    unread: 3,
    aiClassification: {
      type: "Sự cố giao hàng",
      confidence: 94,
      sop: "SOP-RET-04",
      suggestedOwner: "PM Vận hành - Lan Tran",
      reason: "AI phát hiện nhắc đến giao hàng trễ, ETA đơn hàng và yêu cầu hoàn tiền trong 2 tin đầu tiên.",
    },
    aiDraft:
      "Chào anh/chị, em rất xin lỗi vì đơn hàng đang giao chậm hơn dự kiến. Em đã ghi nhận mã đơn và đang chuyển gấp cho bộ phận vận hành kiểm tra ETA để phản hồi trong 15 phút tới.",
    tags: ["Khách VIP", "Có khả năng hoàn tiền", "Cần theo dõi tiếp"],
    messages: [
      { from: "customer", name: "Nguyen Minh Anh", time: "09:12", text: "Shop ơi đơn #A1921 của tôi vẫn chưa nhận được dù app báo giao hôm qua." },
      { from: "customer", name: "Nguyen Minh Anh", time: "09:13", text: "Nếu hôm nay không có thì tôi muốn hoàn tiền." },
      { from: "ai", name: "AI phản hồi đầu tiên", time: "09:13", sop: "SOP-RET-04", text: "Em xin lỗi vì trải nghiệm chưa tốt. Em đang kiểm tra tình trạng vận chuyển và sẽ cập nhật sớm nhất cho anh/chị." },
      { from: "staff", name: "Lan Tran", time: "09:15", text: "Mình đã nhận trường hợp này và đang kiểm tra với đối tác giao hàng." },
    ],
    smartReplies: [
      "Em đã chuyển case này cho PM Vận hành phụ trách khu vực. Anh/chị sẽ nhận ETA mới trong 15 phút.",
      "Em ghi nhận yêu cầu hoàn tiền và sẽ kiểm tra điều kiện xử lý theo chính sách trước khi phản hồi.",
    ],
  },
  {
    id: "cv-02",
    customer: "Tran Bao Vy",
    avatar: "BV",
    channel: "Website",
    topic: "Tư vấn gói dịch vụ enterprise",
    preview: "Khách hỏi gói enterprise cho 45 agent và SLA triển khai.",
    time: "11 phút trước",
    priority: "Trung bình",
    sentiment: "Trung lập",
    unread: 1,
    aiClassification: {
      type: "Yêu cầu tư vấn bán hàng",
      confidence: 97,
      sop: "SOP-SALES-02",
      suggestedOwner: "Trưởng nhóm Sales - Duc Pham",
      reason: "Khách hỏi về số lượng user, SLA, quy trình onboarding và hợp đồng năm.",
    },
    aiDraft:
      "Chào anh/chị, với nhu cầu team nhiều người dùng và cần SLA, bên em có gói enterprise hỗ trợ phân quyền, log kiểm soát AI và tích hợp CRM. Em sẽ kết nối chuyên viên tư vấn để gửi proposal phù hợp.",
    tags: ["Lead B2B", "Doanh nghiệp", "Giá trị cao"],
    messages: [
      { from: "customer", name: "Tran Bao Vy", time: "08:54", text: "Bên mình muốn dùng cho 45 agent và cần phân quyền theo team. Có demo không?" },
      { from: "ai", name: "AI phản hồi đầu tiên", time: "08:55", sop: "SOP-SALES-02", text: "Bên em có gói enterprise kèm phân quyền, dashboard và API tích hợp. Em có thể thu thập nhanh số lượng users và nhu cầu SLA để sắp lịch demo." },
      { from: "customer", name: "Tran Bao Vy", time: "08:57", text: "Cho mình hỏi thêm về thời gian triển khai và chi phí annual." },
    ],
    smartReplies: [
      "Em có thể sắp lịch demo 30 phút với Sales Lead trong hôm nay. Anh/chị cho em khung giờ phù hợp nhé.",
      "Với 45 agent, bên em sẽ đề xuất gói enterprise có phân quyền team, SLA và tích hợp CRM/API.",
    ],
  },
  {
    id: "cv-03",
    customer: "Le Hoang Nam",
    avatar: "HN",
    channel: "Zalo",
    topic: "Đổi lịch bảo hành",
    preview: "Khách muốn đổi lịch bảo hành từ chiều nay sang sáng mai.",
    time: "24 phút trước",
    priority: "Thấp",
    sentiment: "Bình tĩnh",
    unread: 0,
    aiClassification: {
      type: "Đổi lịch hẹn",
      confidence: 88,
      sop: "SOP-CS-07",
      suggestedOwner: "Nhân viên hỗ trợ - Quynh Vo",
      reason: "Nội dung có yêu cầu đổi lịch và nhắc đến phiếu đặt lịch trước đó.",
    },
    aiDraft:
      "Dạ em đã ghi nhận yêu cầu đổi lịch bảo hành. Anh/chị giúp em xác nhận ngày mong muốn mới để bộ phận kỹ thuật sắp xếp khung giờ còn trống.",
    tags: ["Bảo hành", "Đổi lịch"],
    messages: [
      { from: "customer", name: "Le Hoang Nam", time: "08:41", text: "Mình muốn đổi lịch bảo hành từ chiều nay sang sáng mai được không?" },
      { from: "ai", name: "AI phản hồi đầu tiên", time: "08:41", sop: "SOP-CS-07", text: "Dạ em hỗ trợ được. Anh/chị cho em xin lại mã phiếu hoặc số điện thoại đặt lịch để em kiểm tra nhanh." },
    ],
    smartReplies: [
      "Dạ em đã thấy lịch trống vào 09:30 sáng mai. Anh xác nhận giúp em khung giờ này nhé.",
      "Em sẽ chuyển yêu cầu đổi lịch cho bộ phận kỹ thuật và cập nhật lại phiếu bảo hành.",
    ],
  },
];

export const tickets = [
  {
    id: "TK-1902",
    channel: "Facebook",
    summary: "Khách chưa nhận đơn #A1921 và yêu cầu hoàn tiền nếu không giao trong ngày.",
    name: "Theo dõi giao hàng trễ - #A1921",
    owner: "Lan Tran",
    role: "PM Vận hành",
    status: "Open",
    deadline: "Hôm nay, 10:30",
    sla: "Có rủi ro",
    audit: {
      reason: "AI tag Lan Tran vì ticket thuộc nhóm logistics miền Nam, có rủi ro hoàn tiền và Lan còn dung lượng SLA.",
      rule: "Rule ROUTE-OPS-04: giao hàng trễ + refund intent -> Operations PM.",
      faq: "FAQ-RET-12: chính sách kiểm tra ETA trước khi xác nhận hoàn tiền.",
      confidence: 95,
    },
  },
  {
    id: "TK-1903",
    channel: "Web",
    summary: "Lead hỏi gói enterprise cho 45 agent, cần phân quyền team và SLA triển khai.",
    name: "Demo gói enterprise cho Bao Vy Co.",
    owner: "Duc Pham",
    role: "Trưởng nhóm Sales",
    status: "In-progress",
    deadline: "25/04, 15:00",
    sla: "Đúng tiến độ",
    audit: {
      reason: "AI tag Duc Pham vì nội dung chứa intent báo giá enterprise, quy mô trên 30 users và yêu cầu demo.",
      rule: "Rule ROUTE-SALES-02: enterprise inquiry -> Sales Lead.",
      faq: "FAQ-SALES-07: điều kiện demo và checklist thông tin trước tư vấn.",
      confidence: 97,
    },
  },
  {
    id: "TK-1904",
    channel: "Zalo",
    summary: "Khách yêu cầu đổi lịch bảo hành sang sáng mai.",
    name: "Cập nhật lịch bảo hành - Le Hoang Nam",
    owner: "Quynh Vo",
    role: "Nhân viên hỗ trợ",
    status: "Resolved",
    deadline: "Đã hoàn tất",
    sla: "Đã đóng",
    audit: {
      reason: "AI tag Quynh Vo vì đây là yêu cầu đổi lịch dịch vụ, không có rủi ro khiếu nại cao.",
      rule: "Rule ROUTE-CS-07: appointment change -> Support Staff.",
      faq: "FAQ-CS-03: quy trình xác nhận lại khung giờ bảo hành.",
      confidence: 88,
    },
  },
  {
    id: "TK-1905",
    channel: "Email",
    summary: "Khách hỏi điều kiện hoàn tiền cho đơn đã giao quá SLA.",
    name: "Chuyển cấp xử lý làm rõ chính sách hoàn tiền",
    owner: "My Nguyen",
    role: "Quản lý CX",
    status: "Open",
    deadline: "25/04, 09:00",
    sla: "Cần xem lại",
    audit: {
      reason: "AI chuyển My Nguyen vì nội dung liên quan chính sách hoàn tiền và cần phê duyệt cấp quản lý.",
      rule: "Rule ESC-CX-09: refund policy ambiguity -> CX Manager.",
      faq: "FAQ-RET-02: phạm vi hoàn tiền theo SLA giao hàng.",
      confidence: 91,
    },
  },
  {
    id: "TK-1906",
    channel: "Web",
    summary: "Đồng bộ lead marketing phát sinh từ chatbot website sang danh sách campaign.",
    name: "Đồng bộ lead marketing từ chatbot website",
    owner: "Huy Le",
    role: "PM Tăng trưởng",
    status: "In-progress",
    deadline: "26/04, 12:00",
    sla: "Đúng tiến độ",
    audit: {
      reason: "AI tag Huy Le vì hội thoại có tín hiệu lead marketing và nguồn đến từ chatbot website.",
      rule: "Rule MKT-LEAD-03: chatbot lead with campaign keyword -> Growth PM.",
      faq: "FAQ-MKT-05: chuẩn hóa lead từ website chatbot.",
      confidence: 89,
    },
  },
];

export const marketingCampaignCards = [
  { label: "Lead mới từ chiến dịch", value: "342", change: "+14%", source: "Facebook + Zalo + Web" },
  { label: "Tỷ lệ chuyển đổi", value: "6.8%", change: "+0.9%", source: "So với tuần trước" },
  { label: "Chi phí / lead", value: "84k", change: "-11%", source: "Đã chuẩn hóa theo kênh" },
  { label: "Content AI đã tạo", value: "126", change: "+21%", source: "Theo guideline ViProperty" },
];

export const internalAssistantMessages = [
  {
    role: "assistant",
    text: "Chào anh/chị. Tôi là trợ lý AI nội bộ, chỉ trả lời trong phạm vi quyền truy cập Quản lý cấp trung.",
    time: "09:00",
  },
  {
    role: "user",
    text: "Tổng hợp nhanh các ticket có nguy cơ trễ SLA hôm nay.",
    time: "09:01",
  },
  {
    role: "assistant",
    text: "Hiện có 18 ticket đến hạn trong 4 giờ tới. 6 ticket thuộc nhóm giao hàng, 4 ticket liên quan hoàn tiền, 8 ticket đang chờ xác nhận lịch xử lý từ PM.",
    time: "09:01",
  },
];

export const auditTrail = [
  {
    time: "09:13:22",
    event: "AI phân loại hội thoại",
    actor: "Bộ định tuyến v2.8",
    detail: "Sự cố giao hàng -> Hàng đợi vận hành",
    risk: "Thấp",
  },
  {
    time: "09:13:23",
    event: "AI tạo phản hồi nháp",
    actor: "Agent phản hồi",
    detail: "Sử dụng SOP-RET-04 cùng chính sách đồng cảm",
    risk: "Thấp",
  },
  {
    time: "09:14:05",
    event: "AI gán người phụ trách",
    actor: "Agent phân công",
    detail: "Chọn Lan Tran theo khu vực và tải công việc hiện tại",
    risk: "Trung bình",
  },
  {
    time: "09:16:11",
    event: "Xác nhận chuyển sang người xử lý",
    actor: "Giám sát viên",
    detail: "Ticket #TK-1902 đã liên kết với hội thoại",
    risk: "Thấp",
  },
];

export const decisionLogs = [
  {
    title: "Vì sao AI gán cho PM Vận hành",
    explanation:
      "Mô hình phát hiện từ khóa về giao hàng, nguy cơ hoàn tiền và nhãn khách VIP. Hệ thống ưu tiên người phụ trách có quyền truy cập logistics và còn dung lượng SLA.",
    score: "Độ tin cậy 0.94",
  },
  {
    title: "Vì sao AI phản hồi theo hướng xin lỗi trước",
    explanation:
      "Mô hình cảm xúc đánh dấu trạng thái bức xúc trong 2 tin đầu. Chính sách yêu cầu xin lỗi và đưa kỳ vọng ETA trước khi hỏi thêm thông tin.",
    score: "Phù hợp SOP",
  },
  {
    title: "Vì sao cần chuyển cho nhân sự",
    explanation:
      "Hội thoại đã đi vào tình huống liên quan đến hoàn tiền, vượt ngưỡng tự chủ cho phép của AI trong bước chốt phương án cuối.",
    score: "Theo quy định tuân thủ",
  },
];

export const marketingSummary = [
  { label: "Lead đủ điều kiện", value: "342", change: "+14%" },
  { label: "Tỷ lệ chuyển đổi chiến dịch", value: "6.8%", change: "+0.9%" },
  { label: "Kênh hiệu quả nhất", value: "Chatbot website", change: "Chiếm 38%" },
  { label: "Nội dung có AI hỗ trợ", value: "126 tài sản", change: "+21%" },
];

export const campaignRows = [
  { name: "Kích hoạt lại mùa xuân", channel: "Email + Chatbot", leads: 118, conversion: "7.1%", status: "Hiệu quả tốt" },
  { name: "Đẩy demo enterprise", channel: "Website", leads: 94, conversion: "8.4%", status: "Ý định cao" },
  { name: "Luồng chăm sóc trung thành Zalo", channel: "Zalo", leads: 71, conversion: "5.2%", status: "Ổn định" },
  { name: "Retargeting Facebook", channel: "Facebook", leads: 59, conversion: "4.6%", status: "Cần làm mới" },
];

export const assistanceIdeas = [
  {
    type: "Hỗ trợ nội dung",
    title: "Chuỗi email onboarding cho lead enterprise",
    detail: "Soạn chuỗi follow-up 3 bước với góc nhìn ROI, case study và CTA đặt lịch demo.",
  },
  {
    type: "Nhắc việc nội bộ",
    title: "Rà soát ticket giao hàng VIP chưa xử lý trước 11:00",
    detail: "Có 12 ticket thuộc nhóm rủi ro hoàn tiền và cần giám sát viên theo dõi.",
  },
  {
    type: "Hỗ trợ nội dung",
    title: "Tạo broadcast Zalo cho chiến dịch gia hạn khuyến mãi",
    detail: "Sinh các biến thể nội dung ngắn cho khách lạnh, khách ấm và khách quay lại.",
  },
];

export const workflowScenarios = [
  {
    id: "wf-delivery",
    customer: "Nguyen Minh Anh",
    channel: "Facebook",
    message: "Đơn #A1921 vẫn chưa giao, nếu hôm nay không nhận được tôi muốn hoàn tiền.",
    context: "Khách VIP, khu vực HCM, có 1 ticket giao hàng đang mở.",
    intent: "Sự cố giao hàng",
    confidence: 95,
    sentiment: "Bức xúc",
    priority: "Cao",
    sop: "SOP-RET-04",
    faq: "FAQ-RET-12",
    owner: "Lan Tran",
    ownerRole: "PM Vận hành",
    tags: ["VIP Customer", "Refund Risk", "Delivery Issue", "Escalation Required"],
    routeRule: "ROUTE-OPS-04",
    escalation: "Supervisor review nếu quá 15 phút chưa có ETA",
    odooQuery: "GET /odoo/orders/A1921",
    odooResult: "Đơn đang ở kho trung chuyển HCM, ETA mới: hôm nay 17:30.",
    ticketId: "TK-1902",
    smartReply:
      "Em xin lỗi vì đơn hàng đang giao chậm. Em đã kiểm tra đơn #A1921 và chuyển PM Vận hành theo dõi ETA mới trong hôm nay.",
  },
  {
    id: "wf-enterprise",
    customer: "Tran Bao Vy",
    channel: "Web",
    message: "Bên mình cần demo gói enterprise cho 45 agent, có phân quyền team và SLA không?",
    context: "Lead mới từ website chatbot, chưa có owner trước đó.",
    intent: "Yêu cầu tư vấn bán hàng",
    confidence: 97,
    sentiment: "Trung lập",
    priority: "Trung bình",
    sop: "SOP-SALES-02",
    faq: "FAQ-SALES-07",
    owner: "Duc Pham",
    ownerRole: "Trưởng nhóm Sales",
    tags: ["Enterprise Lead", "High LTV", "Demo Request"],
    routeRule: "ROUTE-SALES-02",
    escalation: "Không cần escalation, chuyển Sales Lead xử lý",
    odooQuery: "GET /api/leads/by-phone",
    odooResult: "Không tìm thấy khách cũ, tạo lead enterprise mới.",
    ticketId: "TK-1903",
    smartReply:
      "Bên em có gói enterprise hỗ trợ phân quyền team, SLA và tích hợp API. Em sẽ kết nối Sales Lead để sắp lịch demo phù hợp.",
  },
  {
    id: "wf-warranty",
    customer: "Le Hoang Nam",
    channel: "Zalo",
    message: "Mình muốn đổi lịch bảo hành từ chiều nay sang sáng mai được không?",
    context: "Có lịch bảo hành #BH-884, trạng thái đã xác nhận.",
    intent: "Đổi lịch hẹn",
    confidence: 88,
    sentiment: "Bình tĩnh",
    priority: "Thấp",
    sop: "SOP-CS-07",
    faq: "FAQ-CS-03",
    owner: "Quynh Vo",
    ownerRole: "Nhân viên hỗ trợ",
    tags: ["Warranty", "Reschedule"],
    routeRule: "ROUTE-CS-07",
    escalation: "Không cần escalation",
    odooQuery: "GET /odoo/appointments/BH-884",
    odooResult: "Còn slot 09:30 sáng mai cho kỹ thuật viên khu vực.",
    ticketId: "TK-1904",
    smartReply:
      "Dạ em hỗ trợ đổi lịch được. Hiện còn khung 09:30 sáng mai, anh xác nhận giúp em để cập nhật phiếu bảo hành.",
  },
];

export const workflowStages = [
  {
    key: "intake",
    title: "1. Tiếp nhận đa kênh",
    description: "Chuẩn hóa hội thoại từ channel về schema chung và gắn customer context.",
  },
  {
    key: "classify",
    title: "2. Phân loại intent",
    description: "AI nhận diện intent, sentiment, priority và confidence score.",
  },
  {
    key: "sop",
    title: "3. SOP/FAQ response",
    description: "Chọn SOP/FAQ phù hợp và sinh phản hồi bước đầu nếu đủ điều kiện.",
  },
  {
    key: "route",
    title: "4. Routing & tagging",
    description: "Gắn tag, owner/PM và xác định có cần handoff/escalation không.",
  },
  {
    key: "odoo",
    title: "5. Truy vấn API/Odoo",
    description: "Gọi dữ liệu nghiệp vụ cần thiết theo quyền và lưu lượt truy vấn.",
  },
  {
    key: "ticket",
    title: "6. Ticket flow",
    description: "Tạo/cập nhật ticket, deadline, SLA risk và trạng thái xử lý.",
  },
  {
    key: "audit",
    title: "7. AI Audit log",
    description: "Lưu action, rule, SOP/FAQ, owner mapping, confidence và lý do quyết định.",
  },
];
