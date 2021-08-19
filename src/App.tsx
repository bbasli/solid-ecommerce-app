import { Component, createSignal } from "solid-js";

const App: Component = () => {
  const [search, setSearch] = createSignal("");

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
      <h1>{search()}</h1>
    </>
  );
};

export default App;
