package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.HibernateUtil;
import hibernate.Recipe;
import hibernate.User;
import java.io.IOException;
import java.io.PrintWriter;
// Path සහ Paths import කරන්න ඕනේ නෑ දැන්
// import java.nio.file.Path;
// import java.nio.file.Paths;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "LoadUserData", urlPatterns = {"/LoadUserData"})
public class LoadUserData extends HttpServlet {

 @Override
protected void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
    System.out.println("enavaaa meheeeeeeeetaaaaaa");
    Gson gson = new Gson();
    JsonObject responseObject = new JsonObject();
    String email = request.getParameter("userId");

    SessionFactory sf = null;
    Session s = null;

    try {
        sf = HibernateUtil.getSessionFactory();
        s = sf.openSession();

        Criteria c = s.createCriteria(User.class);
        c.add(Restrictions.eq("email", email));
        User user = (User) c.uniqueResult();

        if (user != null) {
            System.out.println(user.getUsername());
            Criteria c1 = s.createCriteria(Recipe.class);
            c1.add(Restrictions.eq("user.id", user.getId()));
            List<Recipe> recipeList = c1.list(); // recipeyList -> recipeList
            System.out.println(recipeList);

            String profileImagePath = user.getProfileImagePath();
            String ngrokUrl = "https://7a71c2478d4d.ngrok-free.app/RecipeApp/profile_image";

            String finalPath;
            if (profileImagePath != null && profileImagePath.startsWith("/")) {
                finalPath = ngrokUrl + profileImagePath;
            } else if (profileImagePath != null) {
                finalPath = ngrokUrl + "/" + profileImagePath;
            } else {
                finalPath = ngrokUrl; // Default image path
            }

            responseObject.addProperty("status", true); // Status should be true on success
            responseObject.add("product", gson.toJsonTree(recipeList));
            responseObject.addProperty("email", user.getEmail());
            responseObject.addProperty("username", user.getUsername());
            responseObject.addProperty("image", finalPath);
            responseObject.addProperty("userId", user.getId());

        } else {
            // User not found
            responseObject.addProperty("status", false);
            responseObject.addProperty("message", "User not found.");
        }

    } catch (Exception e) {
        e.printStackTrace(); // Log the exception for debugging
        responseObject.addProperty("status", false); // Status should be false on error
        responseObject.addProperty("message", "An error occurred while processing your request.");
    } finally {
        if (s != null) {
            s.close();
        }
    }

    // Always set content type and write the JSON response
    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8"); // Good practice for encoding
    String toJson = gson.toJson(responseObject);
    response.getWriter().write(toJson);
}
}