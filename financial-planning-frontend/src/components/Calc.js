import React, { useState } from "react";
import "../styles/Calc.css";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    BarChart,
    Bar,
    Legend,
    ResponsiveContainer,
} from "recharts";

const InputSection = ({ inputs, handleChange, calculateResults }) => (
    <div className="input-section">
        <div className="form-container">
            <label>Initial Invested Amount:</label>
            <input
                type="number"
                name="initialAmount"
                value={inputs.initialAmount}
                onChange={handleChange}
            />

            <label>Rate of Return (%):</label>
            <input
                type="number"
                name="rateOfReturn"
                value={inputs.rateOfReturn * 100}
                onChange={(e) =>
                    handleChange({ target: { name: "rateOfReturn", value: e.target.value / 100 } })
                }
            />

            <label>Annual Addition to the Pool:</label>
            <input
                type="number"
                name="annualAddition"
                value={inputs.annualAddition}
                onChange={handleChange}
            />

            <label>Number of Years:</label>
            <input
                type="number"
                name="numberOfYears"
                value={inputs.numberOfYears}
                onChange={handleChange}
            />

            <label>Current Age of Husband:</label>
            <input
                type="number"
                name="currentAgeHusband"
                value={inputs.currentAgeHusband}
                onChange={handleChange}
            />

            <label>Current Age of Wife:</label>
            <input
                type="number"
                name="currentAgeWife"
                value={inputs.currentAgeWife}
                onChange={handleChange}
            />

            <label>Withdrawal Amount:</label>
            <input
                type="number"
                name="withdrawalAmount"
                value={inputs.withdrawalAmount}
                onChange={handleChange}
            />

            <label>Inflation Rate (%):</label>
            <input
                type="number"
                name="inflationRate"
                value={inputs.inflationRate}
                onChange={handleChange}
            />

            <label>Tax Bracket (%):</label>
            <input
                type="number"
                name="taxBracket"
                value={inputs.taxBracket}
                onChange={handleChange}
            />

            <label>Capital Gain Tax (%):</label>
            <input
                type="number"
                name="capitalGainTax"
                value={inputs.capitalGainTax}
                onChange={handleChange}
            />
        </div>

        <button onClick={calculateResults}>Calculate</button>
    </div>
);

const ResultsSection = ({ results }) => {
    const currencyFormat = (value) =>
        new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

    const percentFormat = (value) =>
        `${value.toFixed(2)}%`;

    return (
        <div className="results-section">
            {results.length > 0 ? (
                <div style={{ overflowX: "auto" }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Year</th>
                                <th>Husband's Age</th>
                                <th>Wife's Age</th>
                                <th>New Deposit</th>
                                <th>Principal</th>
                                <th>% Growth</th>
                                <th>Gains</th>
                                <th>Taxes</th>
                                <th>Net Gains</th>
                                <th>Withdrawal</th>
                                <th>Cumulative Withdrawal</th>
                                <th>Tax Paid</th>
                                <th>Cumulative Tax Paid</th>
                                <th>Net Withdrawal</th>
                                <th>End of Year Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.year}</td>
                                    <td>{row.ageHusband}</td>
                                    <td>{row.ageWife}</td>
                                    <td>{currencyFormat(row.newDeposit)}</td>
                                    <td>{currencyFormat(row.principal)}</td>
                                    <td>{percentFormat(row.growth)}</td>
                                    <td>{currencyFormat(row.gains)}</td>
                                    <td>{currencyFormat(row.taxes)}</td>
                                    <td>{currencyFormat(row.netGains)}</td>
                                    <td>{currencyFormat(row.withdrawal)}</td>
                                    <td>{currencyFormat(row.cumulativeWithdrawal)}</td>
                                    <td>{currencyFormat(row.taxPaid)}</td>
                                    <td>{currencyFormat(row.cumulativeTaxPaid)}</td>
                                    <td>{currencyFormat(row.netWithdrawal)}</td>
                                    <td>{currencyFormat(row.endBalance)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No results to display. Please calculate.</p>
            )}
        </div>
    );
};




const GraphSection = ({ results }) => {
    const formattedData = results.map((row) => ({
        year: row.year,
        endBalance: row.endBalance,
        cumulativeWithdrawal: row.cumulativeWithdrawal,
        cumulativeTaxPaid: row.cumulativeTaxPaid,
    }));

    return (
        <div className="results-section">
            {results.length > 0 ? (
                <>
                    <h2>Graphical Representation</h2>

                    {/* Line Chart */}
                    <div className="chart-container">
                        <h3>Portfolio Growth Over Time</h3>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={formattedData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                                <XAxis dataKey="year" label={{ value: "Year", position: "insideBottom", offset: -10 }} />
                                <YAxis
                                    label={{
                                        value: "End Balance ($)",
                                        angle: -90,
                                        position: "insideLeft",
                                        offset: -5,
                                    }}
                                />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="endBalance"
                                    stroke="#8884d8"
                                    activeDot={{ r: 8 }}
                                    name="End of Year Balance"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Bar Chart */}
                    <div className="chart-container">
                        <h3>Cumulative Withdrawals and Taxes</h3>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={formattedData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                                <XAxis dataKey="year" label={{ value: "Year", position: "insideBottom", offset: -10 }} />
                                <YAxis
                                    label={{
                                        value: "Amount ($)",
                                        angle: -90,
                                        position: "insideLeft",
                                        offset: -5,
                                    }}
                                />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    dataKey="cumulativeWithdrawal"
                                    fill="#82ca9d"
                                    name="Cumulative Withdrawals"
                                />
                                <Bar
                                    dataKey="cumulativeTaxPaid"
                                    fill="#ff7300"
                                    name="Cumulative Taxes Paid"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </>
            ) : (
                <p>No results to display. Please calculate.</p>
            )}
        </div>
    );
};






const App = () => {
    const [inputs, setInputs] = useState({
        initialAmount: 1200000,
        rateOfReturn: 0.08,
        annualAddition: 200000,
        numberOfYears: 10,
        currentAgeHusband: 52,
        currentAgeWife: 50,
        withdrawalAmount: 50000,
        inflationRate: 2,
        taxBracket: 25,
        capitalGainTax: 15, // Added Capital Gain Tax
    });

    const [results, setResults] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: parseFloat(value) });
    };

    const calculateResults = () => {
        const {
            initialAmount,
            rateOfReturn,
            annualAddition,
            numberOfYears,
            currentAgeHusband,
            currentAgeWife,
            withdrawalAmount,
            inflationRate,
            taxBracket,
            capitalGainTax,
        } = inputs;
    
        let portfolioValue = initialAmount;
        let cumulativeWithdrawal = 0;
        let cumulativeTaxPaid = 0;
    
        const newResults = [];
    
        const totalYears = 100 - currentAgeHusband; // Calculate years until husband reaches 100
    
        for (let year = 1; year <= totalYears; year++) {
            const ageHusband = currentAgeHusband + year;
            const ageWife = currentAgeWife + year;
    
            const currentAddition = year <= numberOfYears ? annualAddition : 0; // Stop new deposits after `numberOfYears`
    
            const growth = portfolioValue * rateOfReturn;
            const taxes = growth * (capitalGainTax / 100); // Calculate taxes based on capital gain tax
            const netGains = growth - taxes;
    
            const inflationAdjustedWithdrawal = withdrawalAmount * Math.pow(1 + inflationRate / 100, year - 1);
            const taxableWithdrawal = inflationAdjustedWithdrawal * (taxBracket / 100);
    
            portfolioValue = portfolioValue + currentAddition + netGains - inflationAdjustedWithdrawal;
    
            cumulativeWithdrawal += inflationAdjustedWithdrawal;
            cumulativeTaxPaid += taxableWithdrawal + taxes;
    
            newResults.push({
                year,
                ageHusband,
                ageWife,
                newDeposit: currentAddition,
                principal: portfolioValue - netGains - currentAddition + inflationAdjustedWithdrawal,
                growth: rateOfReturn * 100,
                gains: growth,
                taxes,
                netGains,
                withdrawal: inflationAdjustedWithdrawal,
                cumulativeWithdrawal,
                taxPaid: taxes + taxableWithdrawal,
                cumulativeTaxPaid,
                netWithdrawal: inflationAdjustedWithdrawal - taxableWithdrawal,
                endBalance: portfolioValue,
            });
        }
    
        setResults(newResults);
    };
    

    return (
        <div className="calc-container">
            <div className="App">
            <h1>Financial Calculator</h1>
            <InputSection inputs={inputs} handleChange={handleChange} calculateResults={calculateResults} />
            </div>
            <div className="App">
            <ResultsSection results={results} />
            </div>
            <div className="App">
            <GraphSection results={results} />
            </div>
        </div>
        
    );
};

export default App;
