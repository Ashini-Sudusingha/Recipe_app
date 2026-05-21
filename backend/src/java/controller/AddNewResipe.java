/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import hibernate.City;
import hibernate.HibernateUtil;
import hibernate.Recipe;
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
import org.hibernate.Session;

/**
 *
 * @author ASUS
 */
@WebServlet(name = "AddNewResipe", urlPatterns = {"/AddNewResipe"})
@MultipartConfig
public class AddNewResipe extends HttpServlet {

    private static final String UPLOAD_PATH = "recipe_image";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("enavaaaaaaaaaaaa recipe valata");

        String name = request.getParameter("name");
        System.out.println(request.getParameter("name"));
        System.out.println(request.getParameter("person"));
        int person = Integer.parseInt(request.getParameter("person"));
        int cal = Integer.parseInt(request.getParameter("cal"));
        String ingri = request.getParameter("ingri");
        String method = request.getParameter("method");
        String UserId = request.getParameter("UserId");

        Part filePart = request.getPart("profileImage");
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

        User user = (User) s.get(User.class, Integer.valueOf(UserId));

        s.save(new Recipe(name, person, cal, ingri, method, fileName, user));
        s.beginTransaction().commit();

        response.getWriter().write("Done");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
