# Statistics for Business Analytics and Data Science A-Z

Link: https://www.udemy.com/data-statistics
Markdown formula: https://goessner.github.io/markdown-it-texmath/index.html
Katex formula: http://copyasmarkup.com/katex/function-support.html

## Distributions

* Continuous variable: data that can take any value (amount of money, ...)
* Discrete variable: data that can take only specific values(categories, age, ...)

### What is a distribution

* Probability Distribution: mathematical function that can be thought of as providing the probability of occurence of different possible outcomes in an experiment (ie: picking a random variable in our dataset)
* Discrete Variable - Distribution curves (bar chart) gives the probability of having someone aged xx for ex
* Continous Variable - Cannot tell the probability of a specific value is as it is always zero, but you can tell the probability of being in a range through integration (the probability function is called Probability Density Function (PDF) )

### Cantor's Diagonal Argument

* Continuous variables can take any values, an infinite number, how can it be ?
* There is an infinite number between any two natural number, actually the infinite of number between 0 and 1 is stronger than the infinite number of natural numbers (0,1,2,3...)
* Proof by absurd:
    * if there is no infinite number of values between 0 and 1, we can count them, ie we can assign a natural number to each of them
    * I then constrct a new value by choosing the nth digit as a complementary to the nth digit of sn 
    * By construction, the new value differs from each sn since their nth digit differs, hence the new value cannot occur in the enumeration
    * Then there is an infinite number of values between 0 and 1, or the set T is uncountable

### What is standard deviation

* Mean: average value that takes the data, value where the data is centered
* Variance / Std Dev: measure of the Spread of the data
    * Range: min and max
    * Variance: average of deviation to the mean $\mu$           
        $Var = \sigma² = \frac {(\sum_{i=1}^N x_i - \mu)² } {N}$
        (the fact that we use square instead of module is because it creates problem with more advanced calculus)
    * Standard Deviation : square root of variance, better than variance as it has the same unit as data (can add standard deviation to mean)
        $Std Dev = \sigma = \sqrt {Var} = \sqrt {\frac {(\sum_{i=1}^N x_i - \mu)² } {N}}$


### Normal Distribution

* $p(x) = \frac {1} {\sigma \sqrt{2\pi}}\epsilon^(-\frac{(x-\mu)^2}{2\sigma^2})$
* For a normal distribution, the probability of falling:
    * between $\mu$ and $\mu + \sigma$ is 34.1% (same for between $\mu$ and $\mu - \sigma$ )
    * between $\mu + \sigma$ and $\mu + 2\sigma$ is 13.6% (same for between $\mu - \sigma$ and $\mu - 2\sigma$ )
    * between $\mu + 2\sigma$ and $\mu + 3\sigma$ is 2.1% (same for between $\mu - 2\sigma$ and $\mu - 3\sigma$ )
    * above $\mu + 3\sigma$ is 0.1% (same for below $\mu - 3sigma$)

![Image](img/normaldistribution.png?raw=true)

* Normal distribution comes up a lot in the world (height of people, ...)

### Skewness (dissymétrie)

* Left or Right Skewed, you need to look to look at where the tail is (where the largest amount of data point is, not where the highest value is)

![Image](img/skewness.png?raw=true)


### Mean, Median, Mode

* Mean: average of values
* Median: value that exactly divides the dataset in two equal parts (in terms of number of data point)
    * you include duplicates.
    * If the median lies between to data point, the median is the average between those two data points.
    * Median are not as affected by outliers as the mean
* Mode: the maximum of the PDF for a continuous variable or the most frequent value for a discrete variable
* Left / Negative Skewed distribution: MEAn < MEDian < MODe
* Right / Positive Skewed distribution: Mean > Median > Mode

### HOMEWORK (in Google Sheets)

https://docs.google.com/spreadsheets/d/1DJzSdbp_nw4l73UhJZcBnEX0-EVCtprZEcz5a3Qi1Mk/edit?usp=sharing

* Use of NORMDIST formula to create the Normal Distribution Density Function
* Use of NORMINV to create a random dataset based on a Normal Distribution Density Function
* Use of FREQUENCY (as array function) to put data in bins and plot in a chart (instead of using a pivot table)
* See https://www.benlcollins.com/spreadsheets/histogram-in-google-sheets/
* WARNING: STDEV formula in Google Sheets calculate the Standard Deviation based on a sample, STDEV on the whole population

## Central Limit Theorem

### Populations and Samples - Parameters and Statistics

* Population is the whole set of events that you observe. It has Parameters such as size (N), mean ($\mu$), standard deviation ($\sigma$)
* A sample is a subset of the population, designed to help assess the parameters of the whole population. It doesn't have parameters but statistics: number of observation in your sample ($n$), mean ($\bar{x}$), standard deviation ($s$)

### Sampling Distribution

* Sometimes taking a sample is not going to give us the right insights in order to solve a business problem.
* Sampling Distribution: we take samples of the same size and we record the mean $\bar{x}$ for each of these samples, and we plot them to get the probability function of the sample means

![Image](img/populationsampling.png?raw=true)

### Central Limit Theorem

* Very useful when we are observing real-world events
* Central Limit theorem
        
        If you take enough samples, the sampling distribution (probability function of the sample means) will be a normal distribution, regardless of the kind of distribution you have in the population.

* Mean of sampling distribution = mean among population

$\mu_{\bar {x}} = \mu$

* Standard deviation of sampling distribution = standard deviation of the population divided by the square root of the SAMPLE SIZE

$\sigma_{\bar {x}} = \frac {\sigma} {\sqrt n}$

* When you increase the size of each sample, the sampling distribution is more a normal distribution that if the size of the sample is small

http://onlinestatbook.com/2/sampling_distributions/clt_demo.html

### Z-Score - Standard/Normal Score - Normalized Variable

* The Z-Score corresponds to the number of standard deviation by which the value of an observation is above the mean value of what is being observed.
* it is the normalized version of variable x

$Z = \frac {x-\mu} {\sigma}$

* With Z you will have a normal distribution centered around 0 and with a standard deviation of 1

![Image](img/zscore.png?raw=true)

* To find out what is a probability, you look at z-score tables http://www.z-table.com/
    * If we want to know that the probability of the normalized variable to be picked below 1.6 (ie the probability of x being observed at less than 1.6 standard deviation from the mean), p(z=1.6) = 0.9452
    * If we want to know the probability of the normalized variable to be between 0 and 1.6, p(0<x<1.6) = 0.9452 - 0.5 = 0.4452

### Hands On CLT - Analytics Challenge

* A client is asking to send 36 boxes but they don't know the weight
* From the history, we know that the average weight is 72 lbs and the standard deviation is 3 lb
* However we don't know the distribution of the parcel weights, or there's no way it follows a normal distribution, and we have to respect the maximum payload of the plane that we are using
* We know that if we take a Sampling Distribution (distribution of the means of the sample), its mean is equal to the mean of the distribution of the population and that its std is linked to the std of the population through sample size.
* The critical mass of a box is the plane capacity divideb by 36 boxes = 73 lb
* If we normalize this value (careful with sigma of the sampling distribution), we obtain 2.12 (ie the z-score lies within 2 std of the sampling distribution mean)
* looking at z-score table, we can say that there is a 98% chance that we will be able to ship the load

### HOMEWORK

* Team individuaal trade earnings can be approximated with a Laplace Distribution, with a mean of 95.7$ and a std of 1247 $. Team makes about 100 trades every week
    * What is a probability of your team making a loss in any given week
    * What is the probability of your team making over 20000$ in a given week

* Sampling distribution: if we take samples of 100 trades within the history of trades of our team, we know that it will follow a normal distribution with a mean = 95.7$ and a std of 1247/sqrt(100)=124.7
* The probability of making a loss, ie p(x<0) => we normalize Z = 0-95.7/124.7 = -0.77 => looking at the table we can tell 22.06%
* The probability of making over 20000$ per week, ie on average 200$ per trade, ie p(x>200) = 1 - p(x<200). Z = 200-95.7/124.7 => 0.836, ie 79.95 (p(z<0.836)). The probability of making over 20000$ per week is 20.05%

## Hypothesis Testing / Statistical Significance

### Statistical Significance

### Hypothesis Testing

#### Steps

#### Rejection Region

#### Assumptions

### Proportion Testing

### HOMEWORK

## Advanced Hypothesis Testing

### What it means when you cannot reject the Null hypothesis

### Student's t-distribution

### T-Tests

### 1-Tailed and 2-Tailed Tests

### Warning about misuse and overuse of p-values

### Real Life Examples

## Vitaly Dolgov's

### Pareto Principle

### Trends in Analytics