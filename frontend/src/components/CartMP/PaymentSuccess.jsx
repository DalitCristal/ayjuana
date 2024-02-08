import { useState, useEffect } from "react";
import Header from "../Header/Header";
import { HOST } from "../../config/config";
import Swal from "sweetalert2";
import { getCookiesByName } from "../../utils/formsUtils";

const PaymentSuccess = () => {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const queryParams = new URLSearchParams(location.search);
  const paymentId = queryParams.get("payment_id");

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        const tokenMP = import.meta.env.VITE_MERCADOPAGO;
        // Realizar el fetch a la API de MercadoPago
        const response = await fetch(
          `https://api.mercadopago.com/v1/payments/${paymentId}`,
          {
            headers: {
              Authorization: `Bearer ${tokenMP}`,
            },
          }
        );

        if (response.ok) {
          const paymentData = await response.json();
          setPaymentInfo(paymentData);

          /* CREANDO TICKET */
          if (paymentData.status === "approved") {
            try {
              if (!paymentData) return;

              const postTicketResponse = await fetch(
                `${HOST}/api/payment/success`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    amount: paymentData.transaction_amount,
                    purchaser: paymentData.payer.email,
                    payment_mp: paymentData.id,
                    status_mp: paymentData.status,
                    MerchantOrder_mp: paymentData.order.id,
                  }),
                  credentials: "include",
                }
              );

              if (postTicketResponse.status === 201) {
                Swal.fire({
                  title: `En un momento le enviaremos el ticket por su correo electrónico`,
                  icon: "success",
                  showConfirmButton: false,
                  timer: 2000,
                });

                // Vaciar carrito
                const token = getCookiesByName("jwtCookie");
                const user = JSON.parse(atob(token.split(".")[1])).user;

                const deleteCart = await fetch(
                  `${HOST}/api/carts/${user.cart} `,
                  {
                    method: "DELETE",
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                    credentials: "include",
                  }
                );

                if (deleteCart.status === 200) {
                  console.log("Carrito vacio");
                }
              } else {
                console.error(
                  `Error en la solicitud, ${postTicketResponse.statusText}`
                );
              }
            } catch (error) {
              console.error(`Error al crear ticket, ${error} `);
            }
          }
          /* FIN TICKET */

          /* EMAIL */
          if (
            paymentData.status === "approved" &&
            paymentData.payer &&
            paymentData.payer.email
          ) {
            try {
              const postEmailResponse = await fetch(
                `${HOST}/api/payment/mail`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ email: paymentData.payer.email }),
                  credentials: "include",
                }
              );

              if (postEmailResponse.ok) {
                console.log();
                Swal.fire({
                  title: `Correo electrónico enviado con éxito.`,
                  icon: "success",
                  showConfirmButton: false,
                  timer: 1500,
                });
              } else {
                console.error(`Error al enviar el correo electrónico`);
              }
            } catch (error) {
              console.error(`${error} `);
            }
          }

          /* FIN DE EMAIL */
        } else {
          console.error(`Error en la solicitud, ${response.statusText} `);
        }
      } catch (error) {
        console.error(`Error en la solicitud, ${error} `);
      }
    };

    fetchPaymentInfo();
  }, [paymentId]);

  return (
    <>
      <Header />
      <div
        className="container"
        style={{
          backgroundColor: "rgba(0, 128, 0, 0.5)",
          border: "solid 1px rgba(0, 128, 0)",
        }}
      >
        {paymentInfo ? (
          <>
            <h2>¡Muchas gracias por elegirnos!</h2>
            <h3>
              ¡{JSON.stringify(paymentInfo.payer.first_name)}, Su compra ha sido
              realizada con éxito!
            </h3>
            <p>
              Recibirá toda la información necesaria al siguiente correo:{" "}
              {JSON.stringify(paymentInfo.payer.email)}
            </p>
          </>
        ) : (
          <p>Cargando información sobre su pago...</p>
        )}
      </div>
    </>
  );
};

export default PaymentSuccess;
