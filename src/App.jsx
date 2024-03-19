import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Button, Form, Pagination, Table } from "react-bootstrap";

import styles from "./App.module.css";

const App = () => {
  const [tempPage, setTempPage] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [orders, setOrders] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://api-car-rental.binaracademy.org/admin/v2/order",
        {
          headers: {
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJjci5pbyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY2NTI0MjUwOX0.ZTx8L1MqJ4Az8KzoeYU2S614EQPnqk6Owv03PUSnkzc",
          },
          params: {
            page,
            pageSize: limit,
          },
        },
      );
      console.log(response.data);

      setOrders(response.data);
    };

    fetchData();
  }, [limit, page]);

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>Dashboard</div>
      <div className={styles.listOrder}>List Order</div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Email</th>
            <th>Car</th>
            <th>Start Rent</th>
            <th>Finish Rent</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.orders?.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.User.email}</td>
              <td>{order.Car?.name || order.CarId}</td>
              <td>{dayjs(order.start_rent_at).format("DD MMMM YYYY")}</td>
              <td>{dayjs(order.end_rent_at).format("DD MMMM YYYY")}</td>
              <td>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(order.total_price)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>Limit</div>

      <Form.Select
        onChange={(e) => setLimit(e.target.value)}
        value={limit}
        aria-label="Default select example"
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </Form.Select>

      <div>Jump to page</div>

      <Form.Select
        onChange={(e) => setTempPage(e.target.value)}
        value={tempPage}
        aria-label="Default select example"
      >
        {Array(orders.pageCount)
          .fill()
          .map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
      </Form.Select>
      <Button onClick={() => setPage(tempPage)}>Go</Button>
      <Pagination>
        <Pagination.First
          onClick={() => {
            setPage(1);
          }}
        />
        <Pagination.Item
          onClick={() => {
            setPage(1);
          }}
        >
          1
        </Pagination.Item>
        <Pagination.Item
          onClick={() => {
            setPage(2);
          }}
        >
          2
        </Pagination.Item>
        <Pagination.Item
          onClick={() => {
            setPage(3);
          }}
        >
          3
        </Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item
          onClick={() => {
            setPage(orders.pageCount);
          }}
        >
          {orders.pageCount}
        </Pagination.Item>
        <Pagination.Last
          onClick={() => {
            setPage(orders.pageCount);
          }}
        />
      </Pagination>
    </div>
  );
};

export default App;
