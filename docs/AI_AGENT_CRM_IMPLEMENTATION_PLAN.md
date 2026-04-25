# Plan triển khai AI Agent CRM đa kênh

## 1. Mục tiêu sản phẩm

Xây dựng hệ thống AI Agent hỗ trợ CSKH/PM đa kênh cho doanh nghiệp, tập trung vào việc tiếp nhận hội thoại, phân loại yêu cầu, phản hồi bước đầu theo SOP/FAQ, điều phối đúng người phụ trách, tạo ticket, lưu audit log và mở rộng dần sang Marketing AI Agent và Trợ lý AI nội bộ.

Mục tiêu vận hành:

- Giảm thời gian phản hồi đầu tiên cho khách hàng.
- Chuẩn hóa cách phân loại, gắn tag, chuyển giao và tạo ticket.
- Cho phép quản lý kiểm soát lý do AI ra quyết định.
- Chuẩn bị kiến trúc tích hợp API/Odoo/ERP theo từng phase.
- Tạo nền tảng mở rộng cho Marketing AI và trợ lý nội bộ.

## 2. Phạm vi hạng mục và ngân sách

| STT | Hạng mục | Mức độ | Chi phí |
| --- | --- | --- | ---: |
| 2 | Thiết kế workflow AI Agent CSKH/PM | Phức tạp | 10.000.000 |
| 3 | Xây dựng lõi AI Agent CSKH/PM đa kênh | Phức tạp | 14.000.000 |
| 4 | Tích hợp kênh & truy vấn hệ thống | Phức tạp | 8.000.000 |
| 5 | Ticketing, logging & audit | Trung bình | 5.000.000 |
| 6 | Dashboard quản trị vận hành | Trung bình | 5.000.000 |
| 7 | Nền tảng Marketing AI Agent | Trung bình | 4.000.000 |
| 8 | Nền tảng Trợ lý AI nội bộ | Trung bình | 3.000.000 |
| 9 | Kiểm thử, UAT, tối ưu & bàn giao | Trung bình | 3.000.000 |

Tổng ngân sách các hạng mục được cung cấp: **52.000.000 VND**.

Ghi chú: Danh sách bắt đầu từ STT 2, chưa thấy hạng mục STT 1. Khi chốt proposal chính thức cần xác nhận STT 1 có bị thiếu hay không.

## 3. Kiến trúc nghiệp vụ tổng quan

Luồng hệ thống chính:

1. Khách hàng gửi tin nhắn từ Zalo, Facebook, Website Chat, Email hoặc kênh ưu tiên khác.
2. Channel Connector chuẩn hóa dữ liệu hội thoại về cùng một schema.
3. AI Conversation Processor đọc nội dung, nhận diện intent, sentiment, entity và độ ưu tiên.
4. SOP/FAQ Engine tìm rule hoặc nội dung phản hồi phù hợp.
5. Routing & Tagging Engine xác định owner, PM, phòng ban, tag nghiệp vụ và mức escalation.
6. AI gửi phản hồi bước đầu nếu đủ điều kiện tự động trả lời.
7. Ticket Service tạo hoặc cập nhật ticket tương ứng.
8. Audit Logger lưu hội thoại, quyết định AI, rule/FAQ đã dùng, confidence score và lịch sử xử lý.
9. Dashboard hiển thị KPI, trạng thái ticket, owner mapping, deadline và hiệu quả AI.
10. Các module mở rộng Marketing AI và Internal AI dùng chung nền tảng phân quyền, audit và connector dữ liệu.

## 4. Workflow AI Agent CSKH/PM

### 4.1 Workflow tiếp nhận hội thoại

Input:

- Channel: Zalo, Facebook, Web Chat, Email.
- Customer profile: tên, số điện thoại, mã khách hàng nếu có.
- Message content: nội dung tin nhắn, file đính kèm nếu có.
- Conversation context: lịch sử hội thoại, ticket đang mở, owner trước đó.

Quy trình:

1. Nhận event tin nhắn từ kênh.
2. Chuẩn hóa message về format chung.
3. Kiểm tra khách hàng đã tồn tại chưa.
4. Gắn hội thoại vào contact hoặc tạo contact tạm.
5. Kiểm tra có ticket đang mở liên quan không.
6. Đẩy hội thoại vào AI classification queue.

Output:

- Conversation record.
- Customer context.
- Processing event cho AI Agent.

### 4.2 Workflow phân loại yêu cầu

AI cần phân loại tối thiểu các nhóm intent:

- Hỏi giá, tư vấn sản phẩm/dịch vụ.
- Báo lỗi, khiếu nại, phản ánh chất lượng.
- Giao hàng, lịch hẹn, bảo hành, kỹ thuật.
- Hoàn tiền, hủy dịch vụ, tranh chấp.
- Lead marketing, quan tâm chương trình, đăng ký tư vấn.
- Hỏi thông tin nội bộ hoặc không thuộc phạm vi CSKH.

Logic xử lý:

1. AI đọc tin nhắn mới nhất và context gần nhất.
2. Trích xuất intent chính, intent phụ, entity quan trọng.
3. Tính confidence score.
4. Nếu confidence cao hơn ngưỡng tự động, cho phép dùng SOP/FAQ để phản hồi bước đầu.
5. Nếu confidence thấp hoặc có rủi ro, đưa vào hàng đợi human review.

Ngưỡng đề xuất:

- `>= 90%`: có thể tự động phản hồi bước đầu nếu rule cho phép.
- `75% - 89%`: đề xuất phân loại, cần nhân sự xác nhận trước phản hồi quan trọng.
- `< 75%`: không tự động phản hồi, chuyển human review.

### 4.3 Workflow SOP/FAQ response

Điều kiện AI được phản hồi:

- Intent rõ ràng.
- Có SOP/FAQ được duyệt.
- Không thuộc nhóm rủi ro cao.
- Không yêu cầu cam kết tài chính/pháp lý cuối cùng.

Quy trình:

1. AI chọn SOP/FAQ phù hợp.
2. Sinh draft phản hồi theo tone doanh nghiệp.
3. Kiểm tra policy guardrail.
4. Nếu đủ điều kiện, gửi phản hồi bước đầu và gắn badge `AI Auto-replied (SOP)`.
5. Nếu chưa đủ điều kiện, hiển thị Smart Reply cho nhân sự bấm gửi.

Ví dụ phản hồi:

- Khiếu nại giao hàng: xin lỗi, xác nhận mã đơn, thông báo sẽ kiểm tra ETA.
- Hỏi giá enterprise: xác nhận nhu cầu, thu thập số lượng user/SLA, đề xuất lịch demo.
- Đổi lịch bảo hành: yêu cầu mã phiếu hoặc xác nhận khung giờ mới.

### 4.4 Workflow routing, tagging và owner mapping

Dữ liệu đầu vào:

- Intent.
- Channel.
- Customer tier.
- Sentiment.
- Khu vực hoặc sản phẩm.
- Lịch sử owner.
- Tải xử lý hiện tại của nhân sự.
- SLA/deadline.

Logic owner mapping:

1. Nếu có owner trước đó và ticket chưa đóng, ưu tiên owner cũ.
2. Nếu intent thuộc nghiệp vụ chuyên biệt, map theo team phụ trách.
3. Nếu có rủi ro cao, map lên supervisor hoặc PM cấp cao.
4. Nếu nhiều owner phù hợp, chọn người có tải xử lý thấp hơn.

Tag đề xuất:

- `VIP Customer`
- `Refund Risk`
- `Delivery Issue`
- `Enterprise Lead`
- `Warranty`
- `Needs Human Review`
- `Escalation Required`

### 4.5 Workflow handoff

Handoff xảy ra khi:

- Confidence thấp.
- Khách hàng bức xúc hoặc có sentiment tiêu cực mạnh.
- Có yêu cầu hoàn tiền, pháp lý, tranh chấp, cam kết chi phí.
- AI không tìm được SOP/FAQ phù hợp.
- Khách yêu cầu gặp người thật.

Quy trình:

1. AI đánh dấu cần handoff.
2. Gợi ý PM/nhân sự xử lý.
3. Tạo hoặc cập nhật ticket.
4. Gửi thông báo nội bộ cho owner.
5. Lưu audit log lý do handoff.

### 4.6 Workflow escalation

Escalation khác handoff ở chỗ đây là chuyển cấp xử lý lên nhóm quản lý hoặc chuyên môn cao hơn.

Trigger escalation:

- SLA sắp trễ.
- Ticket bị reopen nhiều lần.
- Khách VIP có khiếu nại.
- Hoàn tiền/tranh chấp vượt quyền nhân viên.
- Nội dung nhạy cảm, pháp lý hoặc truyền thông.

Output:

- Escalation level.
- Supervisor owner.
- Deadline mới.
- Audit reason.
- Notification event.

### 4.7 Workflow ticket flow

Ticket lifecycle đề xuất:

1. `Open`: ticket mới tạo từ hội thoại hoặc nhân sự tạo thủ công.
2. `In-progress`: đã có owner nhận xử lý.
3. `Waiting Customer`: chờ khách bổ sung thông tin.
4. `Waiting Internal`: chờ bộ phận nội bộ hoặc Odoo/API trả dữ liệu.
5. `Resolved`: đã xử lý xong.
6. `Reopened`: khách phản hồi lại hoặc chưa hài lòng.
7. `Closed`: đóng hoàn toàn sau thời gian theo dõi.

Field ticket tối thiểu:

- Mã ticket.
- Nguồn kênh.
- Customer.
- Tóm tắt yêu cầu.
- Intent.
- Owner/PM.
- Status.
- Priority.
- Deadline.
- SLA risk.
- Conversation link.
- AI audit log.

## 5. Ticketing, logging & audit

### 5.1 Logging hội thoại

Cần lưu:

- Tin nhắn khách hàng.
- Tin nhắn nhân sự.
- Tin nhắn AI.
- Thời gian gửi/nhận.
- Channel.
- Conversation ID.
- Ticket ID liên quan.

### 5.2 AI decision audit log

Mỗi quyết định AI cần có:

- AI action: classify, reply, tag owner, handoff, escalate, create ticket.
- Input summary.
- Detected intent.
- Confidence score.
- Rule/SOP/FAQ đã dùng.
- Owner được chọn.
- Lý do chọn owner.
- Risk flags.
- Model/prompt version nếu có.
- Người can thiệp sau đó nếu có.

Ví dụ audit:

- Vì sao AI tag PM này: "Intent giao hàng trễ + refund risk + khu vực miền Nam -> Operations PM Lan Tran".
- Rule đã dùng: `ROUTE-OPS-04`.
- FAQ đã dùng: `FAQ-RET-12`.
- Confidence: `95%`.

## 6. Tích hợp kênh & API/Odoo

### 6.1 Channel connector

Phase đầu nên ưu tiên:

- Website Chat.
- Facebook Messenger/Page Inbox.
- Zalo OA.
- Email hoặc form liên hệ.

Mỗi connector cần chuẩn hóa:

- `channel`
- `external_message_id`
- `sender`
- `content`
- `timestamp`
- `attachment`
- `conversation_id`

### 6.2 API/Odoo connector

Các use case truy vấn Odoo/API:

- Kiểm tra thông tin khách hàng.
- Kiểm tra đơn hàng/hợp đồng/lịch hẹn.
- Lấy trạng thái xử lý nội bộ.
- Cập nhật ticket hoặc note vào hệ thống nghiệp vụ.
- Đồng bộ owner/PM hoặc team phụ trách.

Ràng buộc:

- Chỉ gọi API khi có quyền.
- Ghi log mọi lượt truy vấn.
- Có retry/error handling.
- Không để AI tự ý cập nhật dữ liệu quan trọng nếu chưa có approval rule.

## 7. Dashboard quản trị vận hành

Màn hình Overview cần có:

- Tổng hội thoại đa kênh.
- Tỷ lệ AI phân loại tự động thành công.
- Số ticket đang mở.
- Thời gian phản hồi trung bình.
- Biểu đồ cột lưu lượng theo kênh: Zalo, Facebook, Web.
- Biểu đồ tròn trạng thái ticket: Open, In-progress, Resolved.

Màn Live Chat & AI Copilot cần có:

- Inbox list.
- Khung chat.
- Badge `AI Auto-replied (SOP)` cho tin AI gửi tự động.
- AI Analysis.
- Handoff.
- Tag Owner.
- Smart Reply.

Màn Ticketing & AI Audit Log cần có:

- Data table ticket.
- Right Drawer khi click row.
- Lý do AI tag owner.
- Rule/FAQ đã dùng.
- Confidence score.

## 8. Marketing AI Agent

Mục tiêu phase đầu:

- Tổng hợp dữ liệu chiến dịch.
- Chuẩn hóa số liệu lead, conversion, CPL.
- Tạo báo cáo cơ bản.
- Hỗ trợ viết nội dung theo guideline ViProperty.

UI demo cần có:

- Campaign metric cards.
- Text editor lớn.
- Cột AI Guideline.
- Input keyword.
- Nút `Generate Content`.
- Output nội dung nháp.

Logic nền tảng:

1. Người dùng nhập keyword hoặc brief.
2. Chọn guideline thương hiệu.
3. AI sinh nội dung nháp.
4. Người dùng chỉnh sửa.
5. Lưu hoặc copy sang kênh triển khai.

## 9. Internal AI Assistant

Mục tiêu phase đầu:

- Chat nội bộ theo phong cách ChatGPT nhưng dùng trong doanh nghiệp.
- Hiển thị quyền truy cập hiện tại.
- Hỗ trợ prompt nhanh: truy vấn Odoo, tổng hợp email, tạo nhắc việc.

UI demo cần có:

- Chat thread.
- Role-based access indicator: `Mức độ truy cập hiện tại: Quản lý cấp trung`.
- Quick Prompts:
- `Truy vấn dữ liệu Odoo`
- `Tổng hợp email hôm nay`
- `Tạo nhắc việc`

Nguyên tắc bảo mật:

- AI chỉ trả lời dữ liệu nằm trong quyền truy cập.
- Mỗi truy vấn nội bộ cần audit log.
- Không hiển thị dữ liệu nhạy cảm nếu role không đủ quyền.

## 10. Backlog triển khai theo giai đoạn

### Giai đoạn 1: Design workflow & foundation

- Chốt intent taxonomy.
- Chốt SOP/FAQ format.
- Thiết kế workflow routing, tagging, handoff, escalation.
- Thiết kế ticket lifecycle.
- Thiết kế audit log schema.
- Thiết kế connector interface cho kênh và Odoo/API.

### Giai đoạn 2: Core AI Agent CSKH/PM

- Xây core conversation processor.
- Xây intent classification.
- Xây SOP/FAQ response generator.
- Xây owner mapping.
- Xây handoff và escalation rules.
- Xây ticket auto-create/update.

### Giai đoạn 3: Channel & system integration

- Tích hợp kênh ưu tiên.
- Đồng bộ hội thoại về inbox.
- Tích hợp API/Odoo theo endpoint đã chốt.
- Xử lý lỗi, retry, fallback.

### Giai đoạn 4: Dashboard, Ticketing, Audit

- Dashboard KPI.
- Live Chat & AI Copilot.
- Ticket table.
- AI Audit Drawer.
- Logging history.

### Giai đoạn 5: Marketing AI & Internal AI

- Marketing campaign cards.
- Content Assistance.
- Internal AI Chat.
- Role-based access indicator.
- Quick prompts.

### Giai đoạn 6: UAT & bàn giao

- Test luồng hội thoại thật.
- Test phân loại intent.
- Test owner mapping.
- Test ticket deadline.
- Test audit log.
- Training người dùng.
- Bàn giao tài liệu.

## 11. Tiêu chí nghiệm thu đề xuất

- AI phân loại đúng các intent mẫu theo bộ test đã thống nhất.
- Tin nhắn AI tự phản hồi phải hiển thị badge và lưu audit.
- Ticket được tạo từ hội thoại với đủ mã ticket, channel, summary, owner, status, deadline.
- Click ticket mở được audit drawer.
- Dashboard hiển thị đủ KPI và chart.
- Marketing AI tạo được nội dung từ keyword/guideline.
- Internal AI hiển thị đúng quyền truy cập và quick prompts.
- Tất cả route chính hoạt động khi refresh trực tiếp.

## 12. Rủi ro và điểm cần chốt

- Chưa có danh sách kênh chính thức và API token của từng kênh.
- Chưa có schema Odoo/API cụ thể.
- Chưa có bộ SOP/FAQ chính thức.
- Chưa có danh sách PM/owner/team và rule phân công.
- Chưa có ma trận phân quyền cho Internal AI.
- Chưa có bộ dữ liệu UAT để đo độ chính xác AI.

Các thông tin cần chốt trước khi triển khai thật:

- Kênh nào bắt buộc phase đầu.
- Endpoint Odoo/API nào được phép đọc/ghi.
- Danh sách intent và tag chuẩn.
- Rule owner mapping.
- Ngưỡng confidence cho auto-reply.
- Quy định escalation và approval.
- Vai trò người dùng và phân quyền dữ liệu.

