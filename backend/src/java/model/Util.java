package model;

public class Util {

    public static String generateCode() {
        int r = (int) (Math.random() * 1000000);
        return String.format("%06d", r);  //Formate කරලා තියෙන්නේ
    }

    public static Boolean isEmailValid(String email) {
        return email.matches("^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$");
    }

    public static Boolean isPasswordValid(String password) {
        return password.matches("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.{8,}).*$");
    }

    public static boolean isCodeValid(String code) {
        return code.matches("^//d{4,5}$");
    }

    public static boolean isMobileValid(String mobile) {
        return mobile.matches("^07[0145678][0-9]{7}$");
    }

    public static boolean isInteger(String value) {
        return value.matches("^\\d+$");
    }

    public static boolean isDouble(String text) {
        return text.matches("^\\d+(\\.\\d{2})?$");
    }
}
