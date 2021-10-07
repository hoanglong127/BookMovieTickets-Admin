import React, { Fragment, useEffect, useState } from "react";
import moment from "moment";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography, Input, Table } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./style.css";
import { fetchMovies } from "../../store/actions/movieAction";

const { Title } = Typography;
const { Search } = Input;

const columns = [
  {
    title: "Mã phim",
    width: 120,
    dataIndex: "maPhim",
    key: "maPhim",
    fixed: "left",
    sorter: (a, b) => a.maPhim - b.maPhim,
  },
  {
    title: "Tên phim",
    dataIndex: "tenPhim",
    key: "tenPhim",
    width: 200,
  },
  {
    title: "Hình ảnh",
    dataIndex: "hinhAnh",
    key: "hinhAnh",
    width: 120,
    render: (url) => (
      <img style={{ width: 50, objectFit: "cover" }} src={url} alt={url} />
    ),
  },
  {
    title: "Ngày khởi chiếu",
    dataIndex: "ngayKhoiChieu",
    key: "ngayKhoiChieu",
    width: 150,
    render: (time) => <p>{moment(time).format("DD/MM/YYYY")}</p>,
  },
  {
    title: "Mô tả",
    dataIndex: "moTa",
    key: "moTa",
    render: (text) => <p>{text.substr(0, 100) + "..."}</p>,
  },
  {
    title: "Thao tác",
    width: 120,
    fixed: "right",
    render: () => (
      <Fragment>
        <Button
          style={{ marginRight: 10 }}
          type="primary"
          icon={<EditOutlined />}
        />
        <Button type="primary" icon={<DeleteOutlined />} danger />
      </Fragment>
    ),
  },
];

const addKey = (list = []) => {
  let newlist = [];

  list.map((item, index) =>
    newlist.push({
      ...item,
      key: index,
    })
  );

  return newlist;
};

const Movies = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const movieList = useSelector((state) => state.movieReducer.movieList);

  useEffect(() => {
    dispatch(fetchMovies);
  }, []);

  useEffect(() => {
    setData(addKey(movieList));
  }, [movieList]);

  const onSearch = (value) => {
    console.log(value);
  };

  const handleChangePagination = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="movieManage">
      <Title level={4}>Danh sách phim</Title>
      <div className="movieManage-controls">
        <Button
          onClick={() => history.push("/movies/addMovie")}
          type="primary"
          icon={<PlusOutlined />}
        >
          Thêm phim
        </Button>
        <Search
          className="admin-search"
          placeholder="Tìm kiếm"
          onSearch={onSearch}
          size="middle"
          style={{ maxWidth: 500 }}
          enterButton
        />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          position: ["bottomCenter"],
          onChange: handleChangePagination,
        }}
        scroll={{ x: 1200 }}
      />
    </div>
  );
};

export default Movies;
