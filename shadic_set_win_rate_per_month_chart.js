import shadic_set_win_rate_per_month_data from "./data/shadic_set_win_rate.json" assert { type: "json" };

const shadic_set_win_rate_per_month_x_data = Object.values(shadic_set_win_rate_per_month_data[0]);
const shadic_set_win_rate_per_month_y_data = Object.values(shadic_set_win_rate_per_month_data[3]);

const shadic_set_win_rate_per_month_chart = new Chart("shadic_set_win_rate_per_month_chart",
{
    type: "line",
    data:
    {
        labels: shadic_set_win_rate_per_month_x_data,
        datasets: 
        [
            {
                label: "Win-Rate",
                data: shadic_set_win_rate_per_month_y_data,
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
                text: "Shadic's Set Win-Rate Each Month"
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
                },
                ticks:
                {
                    autoSkip: false,
                    maxRotation: 90,
                    minRotation: 90
                }
            },
            y:
            {
                
                title:
                {
                    display: true,
                    align: "center",
                    text: "Set Win-Rate"
                },
                min: 0,
                max: 1
            }
        }
    }
});