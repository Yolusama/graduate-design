package SelfSchedule.Entity.Handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;

public class MapTypeHandler extends BaseTypeHandler<Map<String,Integer>> {
    private final ObjectMapper mapper = new ObjectMapper();
    @Override
    public void setNonNullParameter(PreparedStatement preparedStatement, int i,
                                    Map<String, Integer> stringIntegerMap, JdbcType jdbcType) throws SQLException {
        try {
            Object toFill = stringIntegerMap == null? null:mapper.writeValueAsString(stringIntegerMap);
            preparedStatement.setObject(i,toFill);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    @Override
    public Map<String, Integer> getNullableResult(ResultSet resultSet, String s) throws SQLException {
        String jsonStr = resultSet.getString(s);
        try {
            if(jsonStr == null)
                return null;
            return mapper.readValue(jsonStr,Map.class);
        }catch (Exception ex){
            ex.printStackTrace();
            return null;
        }
    }

    @Override
    public Map<String, Integer> getNullableResult(ResultSet resultSet, int i) throws SQLException {
        String jsonStr = resultSet.getString(i);
        try {
            if(jsonStr == null)
                return null;
            return mapper.readValue(jsonStr,Map.class);
        }catch (Exception ex){
            ex.printStackTrace();
            return null;
        }
    }

    @Override
    public Map<String, Integer> getNullableResult(CallableStatement callableStatement, int i) throws SQLException {
        String jsonStr = callableStatement.getString(i);
        try {
            if(jsonStr == null)
                return null;
            return mapper.readValue(jsonStr,Map.class);
        }catch (Exception ex){
            ex.printStackTrace();
            return null;
        }
    }
}
