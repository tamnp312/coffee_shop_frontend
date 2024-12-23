import React, { useEffect, useState, useCallback } from "react";
import { Button, Table, Tag, Spin, message, Popconfirm } from "antd";
import fetchWithAuth from "../../helps/fetchWithAuth";
import summaryApi from "../../common";
import { LoadingOutlined } from "@ant-design/icons";
import OrderDetails from "./OrderDetails";

const OrderHistory = React.memo(() => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleViewDetails = (orderId) => {
    setSelectedOrderId(orderId);
  };

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const resp = await fetchWithAuth(summaryApi.getUserOrders.url, {
        method: summaryApi.getUserOrders.method,
      });
      const response = await resp.json();
      if (response.respCode === "000") {
        setOrders(response.data);
      } else {
        console.error("Error fetching orders:", response);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);


  const handleCancelOrder = async (orderId) => {
    try {
      const response = await fetchWithAuth(
        `${summaryApi.cancelOrder.url}${orderId}`,
        {
          method: summaryApi.cancelOrder.method,
        }
      );
      const result = await response.json();
      if (result.respCode === "000") {
        message.info("Đã hủy thành công đơn hàng ");

        setOrders((prevOrders) =>
          prevOrders.map((item) =>
            item.orderId === orderId
              ? { ...item, orderStatus: "Cancelled" }
              : item
          )
        );
      }else {
        message.error("Bạn không thể hủy được đơn hàng này!");
      }
    } catch (error) {
      console.error("Error cancelling order:", error.message);
    }
  };

  if (loading) {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return (
      <div className="flex justify-center h-screen mt-3">
        <Spin indicator={antIcon} />
      </div>
    );
  }

  const columns = [
    {
      title: "STT",
      key: "id",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (status) => (
        <Tag
          color={
            status === "Completed"
              ? "green"
              : status === "Cancelled"
              ? "red"
              : "blue"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (method) => <Tag color="blue">{method}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex flex-wrap gap-2">
          <Button
            type="primary"
            onClick={() => handleViewDetails(record.orderId)}
          >
            View Order
          </Button>

          <Button
            type="primary"
            danger
            disabled={record.orderStatus === "Cancelled" || record.orderStatus === "Completed" }
          >
            <Popconfirm
              title="Bạn có chắc muốn hủy đơn hàng này?"
              onConfirm={() => handleCancelOrder(record.orderId)}
              okText="Yes"
              cancelText="No"
            >
              Cancel Order
            </Popconfirm>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
        Order History
      </h1>
      <Table
        columns={columns}
        dataSource={orders.sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
        )}
        rowKey="orderId"
        pagination={{ pageSize: 5 }}
        className="overflow-x-auto"
      />
      {selectedOrderId && (
        <OrderDetails
          orderId={selectedOrderId}
          onClose={() => setSelectedOrderId(null)}
        />
      )}
    </div>
  );
});

export default OrderHistory;