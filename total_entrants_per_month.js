import total_entrants_per_month_data from "./data/total_entrants_per_month.json" assert { type: "json" };

const total_entrants_per_month_x_data = Object.values(total_entrants_per_month_data[0]);
const total_entrants_per_month_y_data = Object.values(total_entrants_per_month_data[1]);

const total_entrants_per_month_chart = new Chart("total_entrants_per_month_chart",
{
    type: "line",
    data:
    {
        labels: total_entrants_per_month_x_data,
        datasets: 
        [
            {
                label: "Entrants",
                data: total_entrants_per_month_y_data,
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
                text: "The Total Number of Entrants Each Month"
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
                    text: "Number of Entrants"
                },
                min: 0,
                max: 140000
            }
        }
    }
});