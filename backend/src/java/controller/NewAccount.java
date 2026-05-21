/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import hibernate.City;
import hibernate.HibernateUtil;
import hibernate.User;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "NewAccount", urlPatterns = {"/NewAccount"})
@MultipartConfig
public class NewAccount extends HttpServlet {

    private static final String UPLOAD_PATH = "profile_image";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("enavaaaaaaaaa image eke aulacccccccccccccccccccccccccccccccccccc");
        String fullName = request.getParameter("fullName");
        String username = request.getParameter("userName");
        String email = request.getParameter("email");
        System.out.println(email);
        String confirmPassword = request.getParameter("confirmpassword");
        String password = request.getParameter("password");
        String selectedCity = request.getParameter("city");
        System.out.println("enavaaaaaaaaa image eke aula");
        Part filePart = request.getPart("profileImage");
        System.out.println("enava methanata image eka show karana thenata000");
        System.out.println(filePart);

        String appPath = getServletContext().getRealPath("");
        String newPath = appPath.replace("build" + File.separator + "web", "web" + File.separator + UPLOAD_PATH);
        File uploadDir = new File(newPath);
        if (!uploadDir.exists()) {
            uploadDir.mkdir();
        }
        String fileName = System.currentTimeMillis() + "_profile.jpg";
        File profile = new File(uploadDir, fileName);
        Files.copy(filePart.getInputStream(), profile.toPath(), StandardCopyOption.REPLACE_EXISTING);

        Session s = HibernateUtil.getSessionFactory().openSession();

        City city = (City) s.get(City.class, Integer.valueOf(selectedCity));

        s.save(new User(fullName, username, email, confirmPassword, fileName, new Date(), city));
        s.beginTransaction().commit();

        response.getWriter().write("Done");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
