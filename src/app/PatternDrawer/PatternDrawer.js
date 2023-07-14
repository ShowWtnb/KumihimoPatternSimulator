import NaraGumiPatternDrawer from "./NaraGumiPatternDrawer";
import UniversalPatternDrawer from "./UniversalPatternDrawer";

function GetPattern(pattern) {
    console.log('GetPattern', pattern)
    if (pattern === '奈良組') {
        return (<NaraGumiPatternDrawer />)
    } else {
        return (
            <div>
                <h1>Not supported.</h1>
            </div>
        );
    }

}

export default function PatternDrawer({ selectedPattern }) {
    console.log('PatternDrawer', selectedPattern);
    return (
        <div>
            {GetPattern(selectedPattern)}
            {/* <UniversalPatternDrawer /> */}
        </div>
    );
}
