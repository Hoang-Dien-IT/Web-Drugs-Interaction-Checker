import React, { useState, useEffect } from "react";
import axios from "../services/api";
import {
    TextField,
    Button,
    List,
    ListItem,
    // ListItemText,
    CircularProgress,
    Alert,
    Box,
    Typography,
    IconButton,
    Grid,
    Autocomplete,
    // Card,
    // CardContent,
    // CardHeader,
    Avatar,
    Snackbar,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import UploadIcon from "@mui/icons-material/Upload";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import RestartAltIcon from "@mui/icons-material/RestartAlt"; // Import icon cho nút "Bắt đầu lại"
import { Cloudinary } from "@cloudinary/url-gen";
// import CloudinaryUploadWidget from "./CloudinaryUploadWidget";

const InteractionSearch = () => {
    const [drugName, setDrugName] = useState("");
    const [drugList, setDrugList] = useState([]);
    const [interactions, setInteractions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [noInteractions, setNoInteractions] = useState(false);
    const [noDrugsFound, setNoDrugsFound] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const [publicUrDocument, setPublicUrDocument] = useState("");
    var myWidget = window.cloudinary.createUploadWidget(
        {
            cloudName: process.env.REACT_APP_CLOUD_NAME,
            uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
            clientAllowedFormats: ["png", "jpeg", "jpg", "pdf"],
            maxImageFileSize: 2000000,
            maxImageWidth: 2000,
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
                console.log(
                    "Done! Here is the image info: ",
                    result.info
                );
                setPublicUrDocument(result.info.url);
            } else if (error) {
                console.error("Upload error:", error);
            }
        }
    );
    // const handleUpLoadDocuments = () => {
    //     try {
    //         myWidget.open();
    //     } catch (error) {
    //         console.error("Lỗi khi tạo upload widget:", error);
    //         alert("Không thể mở upload widget. Vui lòng thử lại.");
    //     }
    // };
    const handleUpLoadDocuments = () => {
        try {
            console.log("vào nút tải ảnh")
        } catch (error) {
            console.error("Lỗi khi tải ảnh:", error);
            alert("Không thể mở upload widget. Vui lòng thử lại.");
        }
    };


    const fetchSuggestions = async (keyword) => {
        if (!keyword) {
            setSuggestions([]);
            return;
        }
        try {
            const response = await axios.get(
                `/interactions/search?keyword=${keyword}`
            );
            setSuggestions(response.data.map((drug) => drug.tenThuoc)); // Lấy danh sách tên thuốc
        } catch (error) {
            console.error("Lỗi khi lấy gợi ý tên thuốc:", error);
        }
    };



    const handleRemoveDrug = (drug) => {
        setDrugList(drugList.filter((d) => d !== drug));
    };

    const handleCheckInteractions = async () => {
        setError("");
        setInteractions([]);
        setNoInteractions(false);
        setNoDrugsFound(false); // Reset trạng thái cảnh báo

        if (drugList.length < 2) {
            // Kiểm tra nếu danh sách thuốc có ít hơn 2 tên
            setError(
                "Vui lòng nhập ít nhất 2 tên thuốc để kiểm tra tương tác."
            );
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("/interactions", {
                drugNames: drugList,
            });

            if (response.data.length === 0) {
                setNoInteractions(true);
            } else {
                setInteractions(response.data);
            }
        } catch (err) {
            if (
                err.response?.data?.message ===
                "No drugs found with the provided names"
            ) {
                setNoDrugsFound(true); // Hiển thị cảnh báo "Không tìm thấy thuốc"
            } else if (
                err.response?.data?.message ===
                "No interactions found for the provided drugs"
            ) {
                setNoInteractions(true);
            } else {
                setError(
                    err.response?.data?.message ||
                        "Unable to retrieve interaction information. Please try again."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    // const handleKeyPress = (event) => {
    //   if (event.key === 'Enter') {
    //     handleAddDrug();
    //   }
    // };

    const handleSaveHistory = async () => {
        try {
            const historyData = {
                drugs_checked: drugList,
                interactions: interactions.map((interaction) => ({
                    drug_a: interaction.HoatChat_1,
                    drug_b: interaction.HoatChat_2,
                    effect: interaction.CanhBaoTuongTacThuoc,
                    severity: interaction.MucDoNghiemTrong,
                })),
                recommendations:
                    "Luôn tham khảo ý kiến bác sĩ trước khi thay đổi thuốc.",
            };

            await axios.post("/interaction-history", historyData);
            alert("Lịch sử kiểm tra đã được lưu thành công!");
        } catch (error) {
            console.error("Error saving interaction history:", error);
            alert("Không thể lưu lịch sử kiểm tra. Vui lòng thử lại.");
        }
    };

    return (
        <Box
            sx={{
                maxWidth: "800px",
                mx: "auto",
                mt: 5,
                p: 3,
                backgroundColor: "#fff",
                borderRadius: 4,
                border: "1px solid #e0e0e0", // Thêm viền nhẹ
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Autocomplete
                    options={suggestions}
                    inputValue={drugName}
                    onInputChange={(event, value, reason) => {
                        if (reason === "input") {
                            setDrugName(value);
                            fetchSuggestions(value);
                        } else if (reason === "clear") {
                            setDrugName("");
                        }
                        // reason === "reset" (sau khi chọn option) -> bỏ qua, để không ghi đè "".
                    }}
                    onChange={(event, value) => {
                        if (value && !drugList.includes(value)) {
                            setDrugList([...drugList, value]);
                            setSuccessMessage(
                                `Đã thêm thuốc "${value}" vào danh sách`
                            );
                            setShowSuccessMessage(true);
                        }
                        setDrugName(""); // reset sau chọn

                        // setSuggestions([]); // tùy chọn: đóng dropdown
                    }}
                    filterOptions={(x) => x} // giữ nguyên danh sách từ server
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Nhập tên thuốc"
                            variant="outlined"
                            fullWidth
                            // onKeyPress={(event) => {
                            //     if (event.key === "Enter") {
                            //         handleAddDrug();
                            //     }
                            // }}
                            sx={{
                                "& .MuiOutlinedInput-root": { borderRadius: 3 },
                            }}
                        />
                    )}
                    sx={{
                        flex: 1,
                        mr: 2,
                        "& .MuiAutocomplete-inputRoot": {
                            paddingRight: "40px !important",
                        },
                    }}
                />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpLoadDocuments}
                    id="upload_widget"
                    startIcon={<UploadIcon />}
                    sx={{
                        ml: 1,
                        // py: 0.5,
                        background: "linear-gradient(90deg, #1976d2, #155a9c)",
                        color: "#fff",
                        fontWeight: "bold",
                        textTransform: "none",
                        borderRadius: 3,
                        "&:hover": {
                            background:
                                "linear-gradient(90deg, #155a9c, #1976d2)",
                        },
                    }}
                >
                    Tải ảnh
                </Button>
            </Box>

            {/* Danh sách thuốc */}
            {drugList.length > 0 && (
                <Box sx={{ mb: 3 }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 1,
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold" }}
                        >
                            Danh sách tương tác chưa lưu
                        </Typography>
                        <Button
                            variant="text"
                            color="primary"
                            startIcon={<RestartAltIcon />}
                            onClick={() => {
                                setDrugList([]); // Xóa toàn bộ danh sách thuốc
                                setInteractions([]); // Thu hồi kết quả kiểm tra tương tác
                                setNoInteractions(false); // Đặt lại trạng thái không có tương tác
                                setNoDrugsFound(false); // Đặt lại trạng thái không tìm thấy thuốc
                                setError(""); // Xóa thông báo lỗi
                            }}
                            sx={{
                                textTransform: "none",
                                fontWeight: "bold",
                            }}
                        >
                            Bắt đầu lại
                        </Button>
                    </Box>
                    <List>
                        {drugList.map((drug, index) => (
                            <ListItem
                                key={index}
                                sx={{
                                    borderBottom: "1px solid #e0e0e0", // Đường kẻ dưới mỗi thuốc
                                    py: 1,
                                    px: 0,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{ color: "#1976d2" }}
                                >
                                    {drug}
                                </Typography>
                                <IconButton
                                    edge="end"
                                    onClick={() => {
                                        handleRemoveDrug(drug);
                                        setInteractions([]); // Thu hồi kết quả kiểm tra tương tác
                                        setNoInteractions(false); // Đặt lại trạng thái không có tương tác
                                        setNoDrugsFound(false); // Đặt lại trạng thái không tìm thấy thuốc
                                        setError(""); // Xóa thông báo lỗi
                                    }}
                                >
                                    <Delete sx={{ color: "#d32f2f" }} />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}

            {/* Cảnh báo "No drugs found" */}
            {noDrugsFound && (
                <Alert severity="warning" sx={{ mt: 3 }}>
                    Không tìm thấy thuốc nào trong cơ sở dữ liệu với tên đã
                    nhập. Vui lòng kiểm tra lại tên thuốc.
                </Alert>
            )}

            {/* Nút kiểm tra tương tác */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleCheckInteractions}
                disabled={loading}
                sx={{
                    mt: 3,
                    background: "linear-gradient(90deg, #1976d2, #155a9c)",
                    color: "#fff",
                    fontWeight: "bold",
                    textTransform: "none",
                    borderRadius: 3,
                    "&:hover": {
                        background: "linear-gradient(90deg, #155a9c, #1976d2)",
                    },
                }}
            >
                {loading ? (
                    <CircularProgress size={24} color="inherit" />
                ) : (
                    "Kiểm tra tương tác"
                )}
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleSaveHistory}
                disabled={loading || interactions.length === 0}
                sx={{
                    mt: 3,
                    ml: 2,
                    background: "linear-gradient(90deg, #DDEAEBFF, #7E8787FF)",
                    color: "#fff",
                    fontWeight: "bold",
                    textTransform: "none",
                    borderRadius: 3,
                    "&:hover": {
                        background:
                            "linear-gradient(90deg, #7E8787FF, #DDEAEBFF)",
                    },
                }}
            >
                Lưu lịch sử
            </Button>
            {error && (
                <Alert severity="error" sx={{ mt: 3 }}>
                    {error}
                </Alert>
            )}
            {/* Kết quả tương tác */}
            {noInteractions && (
                <Box sx={{ mt: 3, textAlign: "center" }}>
                    <WarningAmberIcon
                        color="warning"
                        sx={{ fontSize: 40, mb: 1 }}
                    />
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Không tìm thấy tương tác thuốc nào.
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Tuy nhiên, điều này không có nghĩa là không có tương tác
                        thuốc tồn tại. Luôn tham khảo ý kiến bác sĩ.
                    </Typography>
                </Box>
            )}
            {interactions.length > 0 && (
                <Box sx={{ mt: 3 }}>
                    {/* Danh sách kết quả tương tác */}
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                        Tương tác giữa các loại thuốc của bạn
                    </Typography>
                    <Grid container spacing={2}>
                        {interactions.map((interaction, index) => (
                            <Grid item xs={12} key={index}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: 2,
                                        p: 2,
                                        backgroundColor:
                                            interaction.MucDoNghiemTrong ===
                                            "Nghiêm trọng"
                                                ? "#fdecea"
                                                : interaction.MucDoNghiemTrong ===
                                                  "Trung bình"
                                                ? "#fff4e5"
                                                : interaction.MucDoNghiemTrong ===
                                                  "Nhẹ"
                                                ? "#e8f5e9"
                                                : "#f5f5f5",
                                        borderRadius: 2,
                                        border:
                                            interaction.MucDoNghiemTrong ===
                                            "Nghiêm trọng"
                                                ? "1px solid #f5c6cb"
                                                : interaction.MucDoNghiemTrong ===
                                                  "Trung bình"
                                                ? "1px solid #ffeeba"
                                                : interaction.MucDoNghiemTrong ===
                                                  "Nhẹ"
                                                ? "1px solid #c8e6c9"
                                                : "1px solid #e0e0e0",
                                        boxShadow:
                                            "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            backgroundColor:
                                                interaction.MucDoNghiemTrong ===
                                                "Nghiêm trọng"
                                                    ? "error.main"
                                                    : interaction.MucDoNghiemTrong ===
                                                      "Trung bình"
                                                    ? "warning.main"
                                                    : interaction.MucDoNghiemTrong ===
                                                      "Nhẹ"
                                                    ? "info.main"
                                                    : "grey.500",
                                            width: 48,
                                            height: 48,
                                        }}
                                    >
                                        {interaction.MucDoNghiemTrong ===
                                        "Nghiêm trọng" ? (
                                            <ErrorIcon />
                                        ) : interaction.MucDoNghiemTrong ===
                                          "Trung bình" ? (
                                            <WarningAmberIcon />
                                        ) : (
                                            <InfoIcon />
                                        )}
                                    </Avatar>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: "bold",
                                                color:
                                                    interaction.MucDoNghiemTrong ===
                                                    "Nghiêm trọng"
                                                        ? "error.main"
                                                        : interaction.MucDoNghiemTrong ===
                                                          "Trung bình"
                                                        ? "warning.main"
                                                        : interaction.MucDoNghiemTrong ===
                                                          "Nhẹ"
                                                        ? "info.main"
                                                        : "grey.700",
                                            }}
                                        >
                                            {interaction.MucDoNghiemTrong}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{ fontWeight: "bold", mb: 1 }}
                                        >
                                            {interaction.HoatChat_1} ↔{" "}
                                            {interaction.HoatChat_2}
                                        </Typography>
                                        {/* <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Áp dụng cho: {interaction.TenThuoc}
              </Typography> */}
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {interaction.CanhBaoTuongTacThuoc}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            sx={{ mt: 1 }}
                                        >
                                            <strong>Lưu ý:</strong> Luôn tham
                                            khảo ý kiến bác sĩ trước khi thay
                                            đổi hoặc ngừng sử dụng bất kỳ loại
                                            thuốc nào.
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                    {/* Phân loại tương tác thuốc */}
                    <Box
                        sx={{
                            mt: 3,
                            p: 3,
                            backgroundColor: "#f9f9f9",
                            borderRadius: 3,
                            border: "1px solid #e0e0e0",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", mb: 2 }}
                        >
                            Phân loại tương tác thuốc
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ mb: 3 }}
                        >
                            Những phân loại này chỉ mang tính hướng dẫn. Mức độ
                            liên quan của tương tác thuốc cụ thể với một cá nhân
                            cụ thể rất khó xác định. Luôn tham khảo ý kiến của
                            nhà cung cấp dịch vụ chăm sóc sức khỏe trước khi bắt
                            đầu hoặc ngừng bất kỳ loại thuốc nào.
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}
                        >
                            {/* Nghiêm trọng */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    p: 2,
                                    backgroundColor: "#fdecea",
                                    borderRadius: 2,
                                    border: "1px solid #f5c6cb",
                                }}
                            >
                                <ErrorIcon
                                    sx={{ color: "error.main", fontSize: 30 }}
                                />
                                <Box>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: "bold",
                                            color: "error.main",
                                        }}
                                    >
                                        Nghiêm trọng
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        Có ý nghĩa lâm sàng cao. Tránh kết hợp;
                                        nguy cơ tương tác lớn hơn lợi ích.
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Trung bình */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    p: 2,
                                    backgroundColor: "#fff4e5",
                                    borderRadius: 2,
                                    border: "1px solid #ffeeba",
                                }}
                            >
                                <WarningAmberIcon
                                    sx={{ color: "warning.main", fontSize: 30 }}
                                />
                                <Box>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: "bold",
                                            color: "warning.main",
                                        }}
                                    >
                                        Trung bình
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        Có ý nghĩa lâm sàng ở mức trung bình.
                                        Thường tránh kết hợp; chỉ sử dụng trong
                                        những trường hợp đặc biệt.
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Nhẹ */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    p: 2,
                                    backgroundColor: "#e8f5e9",
                                    borderRadius: 2,
                                    border: "1px solid #c8e6c9",
                                }}
                            >
                                <InfoIcon
                                    sx={{ color: "info.main", fontSize: 30 }}
                                />
                                <Box>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: "bold",
                                            color: "info.main",
                                        }}
                                    >
                                        Nhẹ
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        Có ý nghĩa lâm sàng tối thiểu. Giảm
                                        thiểu rủi ro; đánh giá rủi ro và cân
                                        nhắc thuốc thay thế.
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Không xác định */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    p: 2,
                                    backgroundColor: "#f5f5f5",
                                    borderRadius: 2,
                                    border: "1px solid #e0e0e0",
                                }}
                            >
                                <InfoIcon
                                    sx={{ color: "grey.500", fontSize: 30 }}
                                />
                                <Box>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: "bold",
                                            color: "grey.700",
                                        }}
                                    >
                                        Không xác định
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        Không có thông tin tương tác nào có sẵn.
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}

            {/* Snackbar for success message */}
            <Snackbar
                open={showSuccessMessage}
                autoHideDuration={3000}
                onClose={() => setShowSuccessMessage(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setShowSuccessMessage(false)}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    {successMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default InteractionSearch;
