import average_entrants_per_month_data from "./data/average_entrants_per_month.json" assert { type: "json" };

const average_entrants_per_month_x_data = Object.values(average_entrants_per_month_data[0]);
const average_entrants_per_month_y_data = Object.values(average_entrants_per_month_data[1]);

const average_entrants_per_month_chart = new Chart("average_entrants_per_month_chart",
{
    type: "line",
    data:
    {
        labels: average_entrants_per_month_x_data,
        datasets: 
        [
            {
                label: "Average Entrants",
                data: average_entrants_per_month_y_data,
                fill: false,
                borderColor: "rgb(0, 0, 255)",
                backgroundColor: "rgb(0, 0, 255)"
            }
        ]
    },
    options:
    {
        animation: false,
        plugins:
        {
            legend:
            {
                display: false
            },
            title:
            {
                display: true,
                text: "Average Number of Entrants Over Time"
            }
        },
        scales:
        {
            x:
            {
                title:
                {
                    display: true,
                    align: "center",
                    text: "Month"
                }
            },
            y:
            {
                
                title:
                {
                    display: true,
                    align: "center",
                    text: "Average Number of Entrants"
                },
                min: 0,
                max: 100
            }
        }
    }
});