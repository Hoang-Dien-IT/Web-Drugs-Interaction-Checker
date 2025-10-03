import React from 'react';
import InteractionSearch from '../components/InteractionSearch';
import {
  Box,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  Link,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const InteractionPage = () => {
  return (
      <Box
          className="container"
          sx={{ py: 5, px: 3, backgroundColor: "#f4f6f8" }}
      >
          <Grid container spacing={4}>
              {/* Cột chính: Nội dung kiểm tra tương tác thuốc */}
              <Grid item xs={12} md={8}>
                  <Box
                      sx={{
                          backgroundColor: "#fff",
                          borderRadius: 3,
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                          p: 4,
                      }}
                  >
                      <Typography
                          variant="h4"
                          sx={{ fontWeight: "bold", mb: 2 }}
                      >
                          Kiểm tra tương tác thuốc
                      </Typography>
                      <Typography
                          variant="body1"
                          color="textSecondary"
                          sx={{ mb: 4 }}
                      >
                          Sử dụng công cụ kiểm tra tương tác thuốc của chúng tôi
                          để tìm các tương tác thuốc, thực phẩm và rượu có khả
                          năng gây hại.
                      </Typography>
                      <InteractionSearch />

                      {/* Phần cảnh báo */}
                      <Box
                          sx={{
                              mt: 4,
                              display: "flex",
                              alignItems: "center",
                              backgroundColor: "#f9f9f9",
                              p: 3,
                              borderRadius: 3,
                              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                          }}
                      >
                          <WarningAmberIcon
                              color="primary"
                              sx={{ fontSize: 60, mr: 2 }}
                          />
                          <Typography variant="body2" color="textSecondary">
                              Không phải tất cả các loại thuốc đều tương tác và
                              không phải mọi tương tác đều có nghĩa là bạn phải
                              ngừng dùng một trong các loại thuốc của mình. Luôn
                              tham khảo ý kiến ​​bác sĩ chăm sóc sức khỏe của
                              bạn về cách quản lý tương tác thuốc trước khi thực
                              hiện bất kỳ thay đổi nào đối với đơn thuốc hiện
                              tại của bạn.
                          </Typography>
                      </Box>

                      {/* Phần câu hỏi thường gặp */}
                      <Box sx={{ mt: 5 }}>
                          <Typography
                              variant="h5"
                              sx={{
                                  fontWeight: "bold",
                                  mb: 3,
                                  textAlign: "center",
                                  color: "#1976d2", // Màu xanh nổi bật
                              }}
                          >
                              Câu hỏi thường gặp về tương tác thuốc
                          </Typography>
                          <Box
                              sx={{
                                  backgroundColor: "#ffffff", // Nền trắng đơn giản
                                  borderRadius: 2,
                                  p: 2,
                              }}
                          >
                              <Accordion
                                  disableGutters
                                  elevation={0} // Loại bỏ đổ bóng
                                  sx={{
                                      mb: 2,
                                      border: "1px solid #e0e0e0", // Đường viền nhẹ
                                      borderRadius: 2,
                                      "&:before": { display: "none" }, // Loại bỏ đường viền mặc định của Accordion
                                  }}
                              >
                                  <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      sx={{
                                          backgroundColor: "#f5f5f5", // Nền xám nhạt
                                          borderRadius: 2,
                                          "&:hover": {
                                              backgroundColor: "#e0e0e0",
                                          }, // Hiệu ứng hover
                                          px: 2,
                                      }}
                                  >
                                      <Typography
                                          variant="body1"
                                          sx={{ fontWeight: "bold" }}
                                      >
                                          Tương tác thuốc là gì?
                                      </Typography>
                                  </AccordionSummary>
                                  <AccordionDetails sx={{ px: 2 }}>
                                      <Typography
                                          variant="body2"
                                          component="div"
                                          color="textSecondary"
                                      >
                                          Có 3 loại tương tác thuốc chính cần
                                          chú ý:
                                          <ul>
                                              <li>
                                                  <strong>
                                                      Tương tác thuốc-thuốc:
                                                  </strong>{" "}
                                                  Đây là loại tương tác thuốc
                                                  phổ biến nhất và liên quan đến
                                                  một loại thuốc tương tác với
                                                  một loại thuốc khác.
                                              </li>
                                              <li>
                                                  <strong>
                                                      Tương tác thuốc-thức ăn và
                                                      thuốc-đồ uống:
                                                  </strong>{" "}
                                                  Thức ăn và đồ uống có thể làm
                                                  thay đổi cách thuốc hoạt động
                                                  hoặc làm trầm trọng thêm tác
                                                  dụng phụ.
                                              </li>
                                              <li>
                                                  <strong>
                                                      Tương tác thuốc-bệnh:
                                                  </strong>{" "}
                                                  Tình trạng sức khỏe của bạn có
                                                  thể ảnh hưởng đến cách thuốc
                                                  hoạt động hoặc dẫn đến tác
                                                  dụng phụ.
                                              </li>
                                          </ul>
                                      </Typography>
                                  </AccordionDetails>
                              </Accordion>

                              <Accordion
                                  disableGutters
                                  elevation={0}
                                  sx={{
                                      mb: 2,
                                      border: "1px solid #e0e0e0",
                                      borderRadius: 2,
                                      "&:before": { display: "none" },
                                  }}
                              >
                                  <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      sx={{
                                          backgroundColor: "#f5f5f5",
                                          borderRadius: 2,
                                          "&:hover": {
                                              backgroundColor: "#e0e0e0",
                                          },
                                          px: 2,
                                      }}
                                  >
                                      <Typography
                                          variant="body1"
                                          sx={{ fontWeight: "bold" }}
                                      >
                                          Những dấu hiệu và triệu chứng phổ biến
                                          của tương tác thuốc là gì?
                                      </Typography>
                                  </AccordionSummary>
                                  <AccordionDetails sx={{ px: 2 }}>
                                      <Typography
                                          variant="body2"
                                          component="div"
                                          color="textSecondary
                                      "
                                      >
                                          Các dấu hiệu và triệu chứng của tương
                                          tác thuốc có thể rất khác nhau. Một số
                                          triệu chứng có thể nhẹ, trong khi
                                          những triệu chứng khác có thể nghiêm
                                          trọng hoặc đe dọa tính mạng.
                                          <br />
                                          <br />
                                          Các dấu hiệu hoặc triệu chứng phổ biến
                                          của tương tác thuốc có thể bao gồm:
                                          <ul>
                                              <li>Buồn ngủ</li>
                                              <li>Chóng mặt</li>
                                              <li>Buồn nôn hoặc nôn</li>
                                              <li>Tiêu chảy</li>
                                              <li>Đau nhức cơ bắp</li>
                                              <li>Trầm cảm</li>
                                              <li>
                                                  Tăng bầm tím hoặc chảy máu
                                              </li>
                                              <li>Nhịp tim bất thường</li>
                                              <li>Phát ban da</li>
                                              <li>Lo lắng hoặc bồn chồn</li>
                                              <li>
                                                  Thuốc của bạn có thể không có
                                                  tác dụng tốt
                                              </li>
                                          </ul>
                                          Nếu bạn nghĩ rằng mình có thể đang gặp
                                          phải triệu chứng hoặc tác dụng phụ do
                                          tương tác thuốc, hãy liên hệ ngay với
                                          nhà cung cấp dịch vụ chăm sóc sức khỏe
                                          để được tư vấn.
                                      </Typography>
                                  </AccordionDetails>
                              </Accordion>

                              <Accordion
                                  disableGutters
                                  elevation={0}
                                  sx={{
                                      mb: 2,
                                      border: "1px solid #e0e0e0",
                                      borderRadius: 2,
                                      "&:before": { display: "none" },
                                  }}
                              >
                                  <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      sx={{
                                          backgroundColor: "#f5f5f5",
                                          borderRadius: 2,
                                          "&:hover": {
                                              backgroundColor: "#e0e0e0",
                                          },
                                          px: 2,
                                      }}
                                  >
                                      <Typography
                                          variant="body1"
                                          sx={{ fontWeight: "bold" }}
                                      >
                                          Làm thế nào để tránh tương tác thuốc?
                                      </Typography>
                                  </AccordionSummary>
                                  <AccordionDetails sx={{ px: 2 }}>
                                      <Typography
                                          variant="body2"
                                          component="div"
                                          color="textSecondary"
                                      >
                                          Vì bạn có thể không biết thuốc của
                                          mình có tương tác gì không nên điều
                                          quan trọng là phải kiểm tra chúng
                                          trước khi bắt đầu điều trị.
                                          <br />
                                          <br />
                                          Sau đây là một số mẹo về cách tránh
                                          tương tác thuốc:
                                          <ul>
                                              <li>
                                                  Hãy cho bác sĩ chăm sóc sức
                                                  khỏe biết về tất cả các loại
                                                  thuốc theo toa mà bạn đang
                                                  dùng, cùng với bất kỳ loại
                                                  thuốc không kê đơn (OTC), bao
                                                  gồm vitamin, thảo dược hoặc
                                                  thực phẩm chức năng.
                                              </li>
                                              <li>
                                                  Có thể sẽ hữu ích nếu bạn mang
                                                  theo một danh sách các loại
                                                  thuốc để trình cho hiệu thuốc
                                                  và các cuộc hẹn khám bệnh.
                                              </li>
                                              <li>
                                                  Hãy trao đổi với bác sĩ chăm
                                                  sóc sức khỏe và dược sĩ về
                                                  thuốc của bạn. Tìm hiểu lý do
                                                  bạn dùng thuốc, tần suất dùng
                                                  thuốc và liệu bạn có nên tránh
                                                  dùng thuốc với các loại thuốc
                                                  khác, rượu, thực phẩm hoặc đồ
                                                  uống khác không.
                                              </li>
                                              <li>
                                                  Hãy yêu cầu bác sĩ hoặc dược
                                                  sĩ kiểm tra thuốc của bạn để
                                                  biết bất kỳ tương tác thuốc
                                                  quan trọng nào. Tìm hiểu cách
                                                  nhận biết tác động của bất kỳ
                                                  tương tác thuốc nào.
                                              </li>
                                              <li>
                                                  Trong trường hợp xảy ra tương
                                                  tác thuốc, hãy tìm hiểu khi
                                                  nào bạn cần gọi cho bác sĩ
                                                  hoặc 911 để được trợ giúp khẩn
                                                  cấp.
                                              </li>
                                          </ul>
                                          Tất cả các loại thuốc đều có hướng dẫn
                                          bằng văn bản. Hãy tuân thủ chặt chẽ
                                          các hướng dẫn đó. Thuốc không kê đơn
                                          cũng có nhãn Thông tin về thuốc giúp
                                          giải thích về thuốc. Đọc kỹ thông tin
                                          này. Nếu bạn không hiểu hướng dẫn, hãy
                                          nhờ chuyên gia chăm sóc sức khỏe giúp
                                          đỡ.
                                      </Typography>
                                  </AccordionDetails>
                              </Accordion>
                          </Box>
                      </Box>
                  </Box>
              </Grid>

              {/* Cột phụ: Công cụ & tài nguyên phổ biến */}
              <Grid item xs={12} md={4}>
                  <Box
                      sx={{
                          p: 3,
                          backgroundColor: "#fff",
                          borderRadius: 3,
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      }}
                  >
                      <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", mb: 2 }}
                      >
                          Công cụ & tài nguyên phổ biến
                      </Typography>
                      <List>
                          <ListItem>
                              <Link
                                  href="/drugs"
                                  underline="hover"
                                  color="primary"
                              >
                                  Danh sách thuốc hiện có
                              </Link>
                          </ListItem>
                          <ListItem>
                              <Link
                                  href="/interactions"
                                  underline="hover"
                                  color="primary"
                              >
                                  Kiểm tra tương tác thuốc
                              </Link>
                          </ListItem>
                          <ListItem>
                              <Link
                                  href="#"
                                  underline="hover"
                                  color="primary"
                                  onClick={(e) => {
                                      e.preventDefault();
                                      const isLoggedIn =
                                          !!localStorage.getItem("token"); // Kiểm tra token trong localStorage
                                      if (isLoggedIn) {
                                          window.location.href =
                                              "/prescriptions"; // Điều hướng đến trang Danh sách thuốc
                                      } else {
                                          window.location.href = "/login"; // Điều hướng đến trang đăng nhập
                                      }
                                  }}
                              >
                                  Danh sách đơn thuốc của tôi
                              </Link>
                          </ListItem>
                          <ListItem>
                              <Link
                                  href="#"
                                  underline="hover"
                                  color="primary"
                                  onClick={(e) => {
                                      e.preventDefault();
                                      const isLoggedIn =
                                          !!localStorage.getItem("token"); // Kiểm tra token trong localStorage
                                      if (isLoggedIn) {
                                          window.location.href =
                                              "/interaction-history"; // Điều hướng đến trang Lịch sử kiểm tra tương tác thuốc
                                      } else {
                                          window.location.href = "/login"; // Điều hướng đến trang đăng nhập
                                      }
                                  }}
                              >
                                  Lịch sử kiểm tra tương tác thuốc
                              </Link>
                          </ListItem>
                          <ListItem>
                              <Link
                                  href="/terms"
                                  underline="hover"
                                  color="primary"
                              >
                                  Điều khoản sử dụng
                              </Link>
                          </ListItem>

                          <ListItem>
                              <Link
                                  href="/about"
                                  underline="hover"
                                  color="primary"
                              >
                                  Giới thiệu về chúng tôi
                              </Link>
                          </ListItem>
                      </List>
                  </Box>
              </Grid>
          </Grid>
      </Box>
  );
};

export default InteractionPage;