import { For } from "../../common/utils";

const HomePage = (props) => {
    return (
        <div>
            hello tihs is HomePage
            <ul>
                <For each={[1, 2, 3, 4, 5]}>{(item) => <li>{item}</li>}</For>
            </ul>
        </div>
    );
};

export default HomePage;
