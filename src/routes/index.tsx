import { component$, useContext, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { MyContext } from "./layout";

interface Affirmation {
  text: string;
  author: string;
}

interface MyContextType {
  affirmations: Affirmation[];
  openModal: boolean;
}



export default component$(() => {
  const displayIndex = useSignal(0)
  const data = useContext<MyContextType>(MyContext);

  useVisibleTask$(({cleanup}) => {
    const interval = setInterval(() => {
      if (displayIndex.value < data.affirmations.length -1 ) {
        displayIndex.value++
      } else {
        displayIndex.value = 0
      }
    }, 30000)
    cleanup(() => clearInterval(interval))
  })

  return (
    <>
      {data.affirmations.length > 0 ? (
        <>
          <h1 class="text-3xl font-semibold text-center">"{data.affirmations[displayIndex.value][0]}"</h1>
          <p class="text-slate-300 text-sm text-center"><i>- {data.affirmations[displayIndex.value][1]}</i></p>
        </>
      ) : (
        <>
          <p class="text-4xl font-semibold text-center">Welcome to Affirmations</p>
          <p onClick$={() => {
            data.openModal = true 
          }} class="mt-5 cursor-pointer px-4 py-2 rounded border border-white border-solid bg-white text-slate-900 hover:bg-slate-300 duration-200">Add an affirmation</p>
        </>
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: "Affirmations",
  meta: [
    {
      name: "description",
      content: "Just a little positivity in a world that doesn't always look to lift you up",
    },
  ],
};
