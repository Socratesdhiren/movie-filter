import React, { useState, memo } from "react";
import { Card, Tag, Modal, Row, Col, Rate, Statistic } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import axios from "axios";
import styled from "styled-components";

const StyledDiv = styled.div`
  text-align: center;
  font-weight: 500;
  font-size: x-large;
`;

const StyledRow = styled(Row)`
  margin: 20px;
`;

const StyledCard = styled(Card)`
  .ant-card-body {
    padding: 0;
  }
`;

const StyledMainRow = styled(Row)``;
const baseUrl = `http://www.omdbapi.com/?`;

const { Meta } = Card;

const MovieCard = (props) => {
  const { movie } = props;

  const [modalVisible, setModalVisbile] = useState(false);
  const [movieDetail, setMovieDetail] = useState({});

  const handleMovieClick = (id) => {
    fetchMovieDetailById(id).then(() => {
      setModalVisbile(!modalVisible);
    });
  };

  const handleOk = () => setModalVisbile(!modalVisible);
  const handleCancel = () => setModalVisbile(!modalVisible);

  const description = (
    <>
      <Tag color="magenta">{movie?.Year}</Tag>
      <Tag color="blue">{movie?.Type}</Tag>
    </>
  );
  const fetchMovieDetailById = (id) => {
    return axios
      .get(`${baseUrl}i=${id}&apikey=6682157d`)
      .then((response) => {
        setMovieDetail(response?.data);
        return response;
      })
      .catch((error) => {
        console.log(error?.response);
        return error?.response;
      });
  };

  const handleMovieRating = () => {
    const rate = +movieDetail?.imdbRating;
    return Math.round((rate / 2) * 10) / 10;
  };

  return (
    <>
      <Card
        hoverable
        style={{ width: 240, margin: "20px" }}
        cover={<img alt="example" src={movie?.Poster} />}
        onClick={() => {
         // handleMovieClick(movie?.imdbID);
        }}
      >
        <Meta title={movie?.Title} description={description} />
      </Card>
      <Modal
        className="movie-detail"
        title={movieDetail?.Title}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <StyledMainRow>
          <Col span={8}>
            <StyledCard
              cover={<img alt="example" src={movieDetail?.Poster} />}
            />
          </Col>

          <Col span={16}>
            <div>
              <StyledDiv>Detail Information</StyledDiv>
              <StyledRow>
                <Col>Rating:</Col>
                <Col>
                  <Rate
                    allowHalf
                    disabled
                    defaultValue={handleMovieRating()}
                    style={{
                      fontSize: 16,
                    }}
                  />
                </Col>
              </StyledRow>
              <StyledRow>
                <Col>Director:</Col>
                <Col>
                  {" "}
                  <strong>{movieDetail?.Director}</strong>{" "}
                </Col>
              </StyledRow>
              <StyledRow>
                <Col>Writer:</Col>
                <Col>
                  {" "}
                  <strong>{movieDetail?.Writer}</strong>{" "}
                </Col>
              </StyledRow>
              <StyledRow>
                <Col>Cast And Crew:</Col>
                <Col>
                  {" "}
                  <strong>{movieDetail?.Actors}</strong>{" "}
                </Col>
              </StyledRow>
              <StyledRow>
                <Col span={12}>
                  <Statistic
                    title="Likes"
                    value={movieDetail?.imdbVotes}
                    prefix={<LikeOutlined />}
                  />
                </Col>
                <Col span={12}>
                  <Statistic title="BoxOffice" value={movieDetail?.BoxOffice} />
                </Col>
              </StyledRow>
            </div>
          </Col>
        </StyledMainRow>
      </Modal>
    </>
  );
};

export default memo(MovieCard);
