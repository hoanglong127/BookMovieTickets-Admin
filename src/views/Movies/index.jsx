import React, { Fragment, useEffect } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography, Input, Table } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./style.css";
import { deleteMovie, fetchMovies } from "../../store/actions/movieAction";

const { Title, Text } = Typography;
const { Search } = Input;

const Movies = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const movieList = useSelector((state) => state.movieReducer.movieList);

  const columns = [
    {
      title: "Mã phim",
      width: 110,
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
      dataIndex: "maPhim",
      width: 120,
      fixed: "right",
      render: (id) => (
        <Fragment>
          <Link
            to={`/movies/editMovie/${id}`}
            style={{ marginRight: 10, fontSize: 20 }}
          >
            <Text type="warning">
              <EditOutlined />
            </Text>
          </Link>
          <Text
            onClick={() => handleDeleteMovie(id)}
            style={{ fontSize: 20, cursor: "pointer" }}
            type="danger"
          >
            <DeleteOutlined />
          </Text>
        </Fragment>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchMovies);
  }, []);

  // Xử lý tìm kiếm
  const onSearch = (value) => {
    console.log(value);
  };

  // Xử lý cuộn trang khi click vào pagination
  const handleChangePagination = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Xử lý xoá phim
  const handleDeleteMovie = (id) => {
    Swal.fire({
      icon: "question",
      title: "Bạn có chắc muốn xoá phim này chứ?",
      showCancelButton: true,
      cancelButtonText: "Huỷ",
      confirmButtonText: "Xoá",
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(
          deleteMovie(id, () => {
            Swal.fire({
              icon: "success",
              title: "Xoá phim thành công!",
            });
          })
        );
      }
    });
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
        dataSource={movieList}
        rowKey="maPhim"
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
