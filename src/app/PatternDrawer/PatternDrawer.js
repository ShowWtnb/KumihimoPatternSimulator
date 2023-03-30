import NaraGumiPatternDrawer from "./NaraGumiPatternDrawer";

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
        </div>
    );
}
