# DS 220 - Project #2
> Team Members:
> - Aryan Sinha

## Project Requirements
- Identify a raw public dataset of interest to you and download the raw data to your computer.
- Frame some 6 to 10 questions that you or others in the area may want to answer analyzing this data.
- Load your data set into a Pandas data frame and do some preprocessing and cleaning if needed (this should be documented).
- Perform exploratory data analysis & visualization.
- Map your questions as queries on the Pandas dataframe to generate answers.
- Derive insight(s) using answers to your questions.
- Communicate those insights as actionable text or a story that may be easy to communicate and share with others in the same dataset.
- Publish your work on github pages at a reachable URL.

## Identify a raw public dataset of interest to you and download the raw data to your computer
For this project, I will be using the SmashData Ultimate Player Database (which can be downloaded [here](https://github.com/smashdata/ThePlayerDatabase)). I am specifically using [this](https://github.com/smashdata/ThePlayerDatabase/releases/tag/v2023.11.26) release, which was published on November 27, 2023, and includes data up until November 26, 2023. This dataset is of great interest to me because I am an active member in the Super Smash Bros. Ultimate scene both here at Penn State, and outside of Penn State. I have met a lot of close friends through the scene and I feel I, along with many of those close friends, have a lot to gain from my analysis on this project. This dataset contains historical data on players, tournaments, and tournament sets (along with rankings, though I will not be using that).

The data is stored in an SQLite database, and thus all relevant data must be acquried from said database. The database includes the following tables:
- `players`, which contains information about players
- `ranking`, which contains ranking information about players
- `ranking_seasons`, which contains ranking information about players for each season
- `sets`, which contains information about tournament sets
- `tournament_info`, which contains information about tournaments

Out of these tables, I am only going to be using `players`, `sets`, and `tournament_info` for this assignment.


## Frame some 6 to 10 questions that you or others in the area may want to answer analyzing this data.
1. How has the average number of entrants for tournaments changed over time?
2. Who are the most played characters of all time?
3. How has a character's winrate changed over time?
4. How has a character's popularity changed over time?
5. How has a player's game winrate changed over time?
6. How has a player's set winrate changed over time?
7. What is a player's "best" character (their character with the highest winrate) and "worst" character (their character with the lowest winrate)?

## 1. How has the average number of entrants for tournaments changed over time?
The database is a SQLite databse, and thus all queries will be made with SQLite. The query for this specific question would be as follows:
```sql
/* Get the month and the average number of entrants that month */
SELECT STRFTIME('%m-%Y', start, 'unixepoch'), AVG(entrants)
/* From the tournament_info table */
FROM tournament_info
/* Where the tournament started on or after the game's launch */
WHERE start >= 1544158800
/* Group by month */
GROUP BY STRFTIME('%m-%Y', start, 'unixepoch')
/* Order by the start of the tournament in ascending order */
ORDER BY start ASC;
```
This does include some form of data cleaning, as there are a few tournaments that are listed as starting before December 7, 2018, which is the day the game released.

From there, I am able to load this data using the following code:
```py
import sqlite3 as sqlite

# The SQLite query
query = """
SELECT STRFTIME('%m-%Y', start, 'unixepoch'), AVG(entrants)
FROM tournament_info 
WHERE start >= 1544158800
GROUP BY STRFTIME('%m-%Y', start, 'unixepoch')
ORDER BY start ASC;
"""

# Connect to the database
conn = sqlite.connect("ultimate_player_database.db")
cursor = conn.cursor()

# Execute the query and retrieve the response
cursor.execute(query)
average_entrants_over_time = cursor.fetchall()

# Close the connection to the database
cursor.close()
conn.close()

import pandas as pd

# Import the data into a DataFrame
average_entrants_over_time_df = pd.DataFrame(average_entrants_over_time, columns=["Month", "Average Entrants"])
average_entrants_over_time_df["Month"] = pd.to_datetime(average_entrants_over_time_df["Month"], format="%m-%Y")
average_entrants_over_time_df["Month"] = average_entrants_over_time_df["Month"].dt.strftime("%B %Y")
```
This takes the data and puts it into a Pandas DataFrame, as well as converts the dates from `%m-%Y` format to `%B %Y` format. From there, I am able to export this data to a CSV file (and an image using Matplotlib) using the following code:
```py
# Export the data to a CSV file
average_entrants_over_time_df.to_csv("data/average_entrants_per_month.csv")

import matplotlib.pyplot as plt

# Create a line plot and a scatter plot with the data
plt.title("Average Number of Entrants Over Time")
plt.xlabel("Month")
plt.ylabel("Average Number of Entrants")
plt.xticks(rotation=90)
plt.plot(average_entrants_over_time_df["Month"].values, average_entrants_over_time_df["Average Entrants"].values)
plt.scatter(average_entrants_over_time_df["Month"].values, average_entrants_over_time_df["Average Entrants"].values)
plt.show()
```
The resulting graph would look like this:
![Graph depicting the average number of entrants at tournaments over time](images/average_entrants_per_month.png)
As we can see, there is a strong downwards trend over time. At first, one may be led to believe this means the game is losing its competitive popularity. However, this data fails to identify one important thing - the number of tournaments occurring each month. That can be found using the following query and similar Python code:
```sql
/* Select the month and the number of tournaments */
SELECT STRFTIME('%m-%Y', start, 'unixepoch'), COUNT(*) 
/* From the tournament_info table */
FROM tournament_info 
/* That started after the game's release */
WHERE start > 1544158800 
/* Grouped by months */
GROUP BY STRFTIME('%m-%Y', start, 'unixepoch') 
/* In order of start time in ascending order */
ORDER BY start ASC;
```
This results in the following graph:
![Graph depicting the number of tournaments occurring each month](images/tournaments_per_month.png)
As we can see, this graph is showing a relatively strong upwards trend. We can confirm the game is becoming more popular over time by showing a graph of the total number of entrants each month. This is found using the following query and, again, similar Python code:
```sql
/* Select the month and the total number of entrants that month */
SELECT STRFTIME('%m-%Y', start, 'unixepoch'), SUM(entrants) 
/* From the tournament_info table */
FROM tournament_info 
/* That started after the game's release */
WHERE start > 1544158800 
/* Grouped by months */
GROUP BY STRFTIME('%m-%Y', start, 'unixepoch') 
/* In order of start time in ascending order */
ORDER BY start ASC;
```
This gives the following graph:
![Graph depicting the number of entrants for each month](images/total_entrants_per_month.png)
As we can very clearly see, there is also an upwards trend for the total number of entrants over time, though there is a good amount of variation in between months. The average number of entrants per month graph isn't necessarily good for determining how popular the game is each month, rather it is useful for figuring out how many entrants to expect at an average local tournament, both over time and during specific months. For example, every January ever since January 2020 has seen a slight increase in the average number of entrants before slowly settling back down. Tournament organizers can use this data in order to somewhat accurately prepare for their local tournaments.