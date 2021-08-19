import { Component, createSignal, createResource, For } from "solid-js";
import { Product } from "./product";

const App: Component = () => {
  const [search, setSearch] = createSignal("");

  const [products] = createResource<Product[]>(
    async () => {
      const response = await fetch("http://fakestoreapi.com/products");
      const products = await response.json();
      return products;
    },
    { initialValue: [] }
  );

  const onAddToCart = (product: Product) => {
    console.log(product);
  };

  return (
    <>
      <div class="bg-blue-900 text-white flex flex-row w-full py-4">
        <div class="text-2xl px-10 py-2">
          <i class="fas fa-donate mr-2"></i>
          Simple eCommerce
        </div>
        <div class="flex-grow">
          <input
            type="text"
            value={search()}
            onInput={(evt) => setSearch(evt.currentTarget.value)}
            class="p-2 text-xl bg-white text-black rounded-lg max-w-md w-96"
          />
        </div>
      </div>
      <div className="grid grid-cols-3">
        <For each={products()}>
          {(product) => (
            <div className="m-2 border border-1 border-blue-600 rounded-t-lg bg-blue-600">
              <h3 className="title font-bold truncate w-full max-w-full py-2 px-4 text-white">
                {product.title}
              </h3>
              <div className="bg-white p-3">
                <div className="w-full flex justify-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-32"
                  />
                </div>
                <div>
                  <div className="text-lg overflow-ellipsis description">
                    {product.description}
                  </div>
                  <br />
                  <div className="flex flex-row mt-2">
                    <div className="text-md mt-1">{product.category}</div>
                    <div className="text-lg text-right flex-grow justify-end mt-1 mr-4 font-bold">
                      {product.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </div>
                    <button
                      onClick={(evt) => {
                        evt.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="text-lg px-8 py-1 font-bold bg-blue-800 text-white rounded-full"
                    >
                      <i className="fas fa-cart-plus mr-2"></i>
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </For>
      </div>
    </>
  );
};

export default App;
