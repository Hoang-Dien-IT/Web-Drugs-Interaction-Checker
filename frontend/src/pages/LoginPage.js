import React, { useState } from "react";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";
import {
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    CircularProgress,
    Divider,
    InputAdornment,
    IconButton,
} from "@mui/material";
import "../styles/LoginPage.css"; // Import LoginPage styles
import { isValidEmail, isValidPassword } from "../utils/validate"; // Import validate utils
// import googleIcon from '../assets/login/provider-google-logomark-24.svg'; // Import Google icon
import facebookIcon from "../assets/login/provider-facebook-logomark-24.svg";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import icons// Import Facebook icon
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const LoginPage = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError("");
        if (!isValidEmail(email)) {
            setError("Vui lòng nhập địa chỉ email hợp lệ");
            return;
        }
        if (!isValidPassword(password)) {
            setError("Vui lòng nhập mật khẩu hợp lệ (tối thiểu 6 ký tự)");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("/auth/login", {
                email,
                password,
                role: "client",
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", "client");
            if (response.data.user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
            }
            setIsLoggedIn(true);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            // const { credential } = credentialResponse; // Lấy token từ Google
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/google`,
                {
                    token: credentialResponse.credential,
                }
            );
            const { token, user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("role", "client");
            localStorage.setItem("user", JSON.stringify(user));
            setIsLoggedIn(true);
            navigate("/");
        } catch (error) {
            console.error(
                error.response?.data?.message || "Google login failed"
            );
            setError(error.response?.data?.message || "Google login failed");
        }
    };

    return (
        <Box
            component="form" // Biến Box thành form
            onSubmit={(e) => {
                e.preventDefault(); // Ngăn chặn hành vi mặc định của form
                handleLogin(); // Gọi hàm đăng nhập
            }}
            sx={{
                maxWidth: 400,
                mx: "auto",
                mt: 4,
                mb: 4,
                p: 4,
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                borderRadius: 4,
                background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
                fontFamily: "Roboto, Arial, sans-serif",
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                align="center"
                sx={{
                    fontWeight: "bold",
                    color: "#2C3237FF",
                    fontFamily: "Poppins, Arial, sans-serif",
                }}
            >
                Đăng Nhập
            </Typography>
            <Typography
                variant="subtitle1"
                gutterBottom
                align="center"
                sx={{
                    color: "#6c757d",
                    fontFamily: "Roboto, Arial, sans-serif",
                    display: "block",
                    mb: 2,
                }}
            >
                Nhập thông tin tài khoản của bạn
            </Typography>
            {error && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                    {error}
                </Alert>
            )}
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                    fontFamily: "Roboto, Arial, sans-serif",
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                    },
                }}
            />
            <TextField
                label="Password"
                type={showPassword ? "text" : "password"} // Hiển thị hoặc ẩn mật khẩu
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)} // Thay đổi trạng thái showPassword
                                edge="end"
                            >
                                {showPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}{" "}
                                {/* Biểu tượng thay đổi */}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                sx={{
                    fontFamily: "Roboto, Arial, sans-serif",
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                    },
                }}
            />
            <Typography
                variant="body2"
                align="left"
                sx={{
                    mt: 1,
                    fontFamily: "Roboto, Arial, sans-serif",
                    color: "#1976d2",
                    textDecoration: "none",
                    cursor: "pointer",
                    "&:hover": {
                        textDecoration: "underline",
                    },
                }}
                onClick={() => navigate("/forgot-password")} // Điều hướng đến trang quên mật khẩu
            >
                Quên mật khẩu?
            </Typography>
            <Button
                type="submit" // Gọi hàm đăng nhập khi nhấn nút
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin}
                disabled={loading}
                sx={{
                    mt: 2,
                    fontWeight: "bold",
                    fontFamily: "Poppins, Arial, sans-serif",
                    background: "linear-gradient(90deg, #1976d2, #155a9c)",
                    "&:hover": {
                        background: "linear-gradient(90deg, #155a9c, #1976d2)",
                    },
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                }}
            >
                {loading ? (
                    <CircularProgress size={21} color="inherit" />
                ) : (
                    "Đăng Nhập"
                )}
            </Button>

            <Divider sx={{ my: 3, color: "#6c757d" }}>Hoặc</Divider>

            <Button
                variant="outlined"
                fullWidth
                sx={{
                    fontWeight: "bold",
                    fontFamily: "Poppins, Arial, sans-serif",
                    color: "#DB4437",
                    borderColor: "#DB4437",
                    "&:hover": {
                        backgroundColor: "#FBE9E7",
                        borderColor: "#DB4437",
                    },
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                }}
            >
                <GoogleOAuthProvider
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                >
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => console.log("Google Login Failed")}
                        text="signin_with" // Tùy chỉnh văn bản nút
                        shape="pill" // Tùy chỉnh hình dạng nút
                        theme="outline" // Tùy chỉnh giao diện nút
                    />
                </GoogleOAuthProvider>
            </Button>

            <Button
                variant="outlined"
                fullWidth
                onClick={() =>
                    // (window.location.href = `${process.env.REACT_APP_API_URL}/auth/facebook`)
                    console.log("Facebook Login")
                }
                sx={{
                    fontWeight: "bold",
                    fontFamily: "Poppins, Arial, sans-serif",
                    color: "#4267B2",
                    borderColor: "#4267B2",
                    "&:hover": {
                        backgroundColor: "#E7F3FF",
                        borderColor: "#4267B2",
                    },
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <img
                    src={facebookIcon}
                    alt="Facebook"
                    style={{ height: 24, marginRight: 8 }}
                />
                Đăng nhập bằng Facebook
            </Button>

            <Typography
                variant="body2"
                align="center"
                sx={{
                    mt: 2,
                    fontFamily: "Roboto, Arial, sans-serif",
                    color: "#555",
                }}
            >
                Không có tài khoản?{" "}
                <a
                    href="/register"
                    style={{
                        color: "#1976d2",
                        textDecoration: "none",
                        fontWeight: "bold",
                    }}
                >
                    Đăng ký ngay
                </a>
            </Typography>
        </Box>
    );
};

export default LoginPage;
