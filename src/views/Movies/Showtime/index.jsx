import React, { useEffect } from "react";
import {
  Typography,
  Form,
  Button,
  Cascader,
  DatePicker,
  InputNumber,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchMovieInfo } from "../../../store/actions/movieAction";

const { Title, Text } = Typography;

const Showtime = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const movieInfo = useSelector((state) => state.movieReducer.movieInfo);

  useEffect(() => {
    const { id } = params;
    dispatch(fetchMovieInfo(id));
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (value) => {
    console.log(value);
  };

  const onOk = (value) => {
    console.log(value);
  };

  return (
    <div className="movieManage">
      <Title level={3}>Tạo lịch chiếu</Title>
      <div className="movie-detail">
        <img src={movieInfo?.hinhAnh} alt={movieInfo?.tenPhim} />
        <div>
          <Title level={5}>{movieInfo?.tenPhim}</Title>
          <Text>{movieInfo?.moTa}</Text>
        </div>
      </div>
      <Form
        name="showtime"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Hệ thống rạp">
          <Cascader
            options={[
              { label: "CGV", value: "CGV" },
              { label: "BHD", value: "BHD" },
            ]}
            onChange={onChange}
            placeholder="Chọn hệ thống rạp"
          />
        </Form.Item>

        <Form.Item label="Cụm rạp">
          <Cascader
            options={[
              { label: "CGV", value: "CGV" },
              { label: "BHD", value: "BHD" },
            ]}
            onChange={onChange}
            placeholder="Chọn cụm rạp"
          />
        </Form.Item>

        <Form.Item label="Ngày chiếu, giờ chiếu">
          <DatePicker
            showTime
            onChange={onChange}
            onOk={onOk}
            placeholder="Chọn ngày giờ chiếu"
          />
        </Form.Item>

        <Form.Item label="Giá vé">
          <InputNumber
            min={85000}
            max={150000}
            defaultValue={85000}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
          <Button type="primary" htmlType="submit">
            Tạo
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Showtime;
